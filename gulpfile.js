const asyncDone = require('async-done');
const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpFile = require('gulp-file');
const shell = require('gulp-shell');
const ghPages = require('gulp-gh-pages');
const path = require('path');
const os = require('os');
const exec = require('child_process').exec;
const del = require('del');
const runSequence = require('run-sequence');
const webpack = require('webpack');
const typescript = require('typescript');
const tslint = require('gulp-tslint');
const remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');

const PATHS = {
  src: 'src/**/*.ts',
  srcIndex: 'src/index.ts',
  style: 'src/style/main.scss',
  specs: 'src/**/*.spec.ts',
  testHelpers: 'src/test/**/*.ts',
  demo: 'demo/**/*.ts',
  demoDist: 'demo/dist/**/*',
  coverageJson: 'coverage/json/coverage-final.json'
};

function platformPath(path) {
  return /^win/.test(os.platform()) ? `${path}.cmd` : path;
}

function webpackCallBack(taskName, gulpDone) {
  return function (err, stats) {
    if (err) throw new gutil.PluginError(taskName, err);
    gutil.log(`[${taskName}]`, stats.toString());
    gulpDone();
  }
}
gulp.task('clean:build', () => { return del('dist/'); });

gulp.task('clean:tests', () => { return del(['temp/', 'coverage/']); });

gulp.task('clean:demo', () => { return del('demo/dist'); });

gulp.task('clean:demo-cache', () => { return del('.publish/'); });

// Public Tasks
gulp.task('clean', ['clean:build', 'clean:tests', 'clean:demo', 'clean:demo-cache']);

gulp.task('ngc', cb => {
  let executable = path.join(__dirname, platformPath('/node_modules/.bin/ngc'));
  exec(`${executable} -p ./tsconfig-es2015.json`, (e) => {
    if (e) console.log(e);
    del('./dist/waste');
    cb();
  }).stdout.on('data', data => { console.log(data); });
});

gulp.task('umd', cb => {
  const ExtractTextPlugin = require('extract-text-webpack-plugin');

  function ngExternal(ns) {
    let ng2Ns = `@angular/${ns}`;
    return { root: ['ng', ns], commonjs: ng2Ns, commonjs2: ng2Ns, amd: ng2Ns };
  }

  function rxjsExternal(context, request, cb) {
    if (/^rxjs\/add\/observable\//.test(request)) {
      return cb(null, { root: ['Rx', 'Observable'], commonjs: request, commonjs2: request, amd: request });
    } else if (/^rxjs\/add\/operator\//.test(request)) {
      return cb(null, { root: ['Rx', 'Observable', 'prototype'], commonjs: request, commonjs2: request, amd: request });
    } else if (/^rxjs\//.test(request)) {
      return cb(null, { root: ['Rx'], commonjs: request, commonjs2: request, amd: request });
    }
    cb();
  }

  webpack(
    {
      entry: {
        bundles: './temp/index.js',
        style: './src/style/main.scss'
      },
      output: { filename: 'dist/[name]/angular-deepsee.js', library: 'ngb', libraryTarget: 'umd' },
      devtool: 'source-map',
      externals: [
        {
          '@angular/core': ngExternal('core'),
          '@angular/common': ngExternal('common'),
          '@angular/forms': ngExternal('forms')
        },
        rxjsExternal
      ],
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap-loader!postcss-loader' })
          },
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap-loader!postcss-loader!sass-loader' })
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin({ filename: './dist/style/angular-deepsee.css' }),
      ]
    },
    webpackCallBack('webpack', cb));
});

function startKarmaServer(isTddMode, isSaucelabs, done) {
  var karmaServer = require('karma').Server;
  var travis = process.env.TRAVIS;

  var config = { configFile: `${__dirname}/karma.conf.js`, singleRun: !isTddMode, autoWatch: isTddMode };

  if (travis) {
    config['reporters'] = ['dots'];
    config['browsers'] = ['Firefox'];
  }

  if (isSaucelabs) {
    config['reporters'] = ['dots', 'saucelabs'];
    config['browsers'] =
      ['SL_CHROME', 'SL_FIREFOX', 'SL_IE10', 'SL_IE11', 'SL_EDGE13', 'SL_EDGE14', 'SL_SAFARI9', 'SL_SAFARI10'];

    if (process.env.TRAVIS) {
      var buildId = `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`;
      config['sauceLabs'] = { build: buildId, tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER };
      process.env.SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY.split('').reverse().join('');
    }
  }

  new karmaServer(config, done).start();
}

gulp.task('build:tests', ['clean:tests'], (cb) => {
  exec(path.join(__dirname, platformPath('/node_modules/.bin/tsc')), (e) => {
    if (e) console.log(e);
    cb();
  }).stdout.on('data', function (data) { console.log(data); });
});

gulp.task('test', ['build:tests'], function (done) {
  startKarmaServer(false, false, () => {
    asyncDone(
      () => { return gulp.src(PATHS.coverageJson).pipe(remapIstanbul({ reports: { 'html': 'coverage/html' } })); }, done);
  });
});

gulp.task('npm', function () {
  var pkgJson = require('./package.json');
  var targetPkgJson = {};
  var fieldsToCopy = ['version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage'];

  targetPkgJson['name'] = 'angular-deepsee';

  fieldsToCopy.forEach(function (field) { targetPkgJson[field] = pkgJson[field]; });

  targetPkgJson['main'] = 'bundles/angular-deepsee.js';
  targetPkgJson['module'] = 'index.js';
  targetPkgJson['typings'] = 'index.d.ts';

  targetPkgJson.peerDependencies = {};
  Object.keys(pkgJson.dependencies).forEach(function (dependency) {
    if (dependency.startsWith('@angular')) {
      targetPkgJson.peerDependencies[dependency] = `^${pkgJson.dependencies[dependency]}`;
    }
  });

  return gulp.src('README.md')
    .pipe(gulpFile('package.json', JSON.stringify(targetPkgJson, null, 2)))
    .pipe(gulp.dest('dist'));
});

gulp.task('scss', done => {
  const Bundler = new (require('scss-bundle').Bundler)();
  Bundler.Bundle(PATHS.style)
    .then(result => {
      console.log('Bundle result: ', result);
      done();
    })
    .catch(error => {
      console.log('Bundle error: ', error);
    });
});

gulp.task('build', done => {
  runSequence('test', 'clean:build', 'ngc', 'umd', 'npm', done);
});

gulp.task(
    'build:demo', ['clean:demo'],
    shell.task(['webpack --config webpack.demo.js --progress --profile --bail'], {env: {MODE: 'build'}}));

gulp.task('demo-push', function() {
  return gulp.src(PATHS.demoDist)
      .pipe(ghPages({remoteUrl: "git@github.com:daimor/angular-deepsee.git", branch: "gh-pages"}));
});

gulp.task(
    'deploy-demo', function(done) { runSequence('clean:demo', 'build:demo', 'demo-push', 'clean:demo-cache', done); });
