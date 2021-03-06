const path = require('path');
const webpack = require('webpack');

// Webpack Plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const aotplugin = require('@ngtools/webpack');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.MODE;
const isProd = ENV === 'build';
const nodeModules = path.join(process.cwd(), 'node_modules');

module.exports = function makeWebpackConfig() {
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   */
  config.entry = {
    'polyfills': './demo/src/polyfills.ts',
    'vendorStyles': [
      './node_modules/prismjs/themes/prism.css',
      './node_modules/bootstrap/dist/css/bootstrap.css'
    ],
    'main': './demo/src/main.ts'
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   */
  config.output = {
    path: root('demo', 'dist'),
    publicPath: isProd ? '/angular-deepsee/' : '/',
    filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
    chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
  };

  /**
   * Resolve
   * Reference: http://webpack.github.io/docs/configuration.html#resolve
   */
  config.resolve = {
    modules: [root('demo'), 'node_modules'],
    // only discover files that have those extensions
    extensions: ['.ts', '.js', '.css', '.scss', '.html'],

    alias: {
      'angular-deepsee': root('src')
    }
  };

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */
  config.module = {
    rules: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        use: isProd ? '@ngtools/webpack' : 'ts-loader'
      },

      {
        test: /\.ts$/,
        use: 'angular2-template-loader'
      },

      // copy those assets to output
      {test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, use: 'file-loader?name=fonts/[name].[hash].[ext]?'},

      // Support for CSS as raw text
      // use 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      {
        test: /\.css$/,
        exclude: root('demo', 'src', 'app'),
        use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap-loader!postcss-loader'})
      },
      // all css required in src/app files will be merged in js files
      {test: /\.css$/, include: root('demo', 'src', 'app'), use: 'raw-loader!postcss-loader'},

      // support for .scss files
      // use 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      {
        test: /\.scss$/,
        exclude: root('src', 'app'),
        use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap-loader!postcss-loader!sass-loader'})
      },
      // all css required in src/app files will be merged in js files
      {test: /\.scss$/, exclude: root('demo', 'src', 'style'), use: 'raw-loader!postcss-loader!sass-loader'},

      // support for .html as raw text
      // todo: change the loader to something that adds a hash to images
      {test: /\.html$/, use: 'raw-loader'},

      {test: /\.md$/, use: 'html-loader!markdown-loader'}
    ],
    noParse: [/.+zone\.js\/dist\/.+/]
  };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    // Clean output dist folder
    new CleanWebpackPlugin([
      "dist"
    ], {
      root: root('demo'),
      verbose: true
    }),

    // Define env variables to help with builds
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(ENV),
        version: JSON.stringify(require('./package.json').version)
      }
    }),

    new CommonsChunkPlugin({
        "name": "vendor",
        "minChunks": (module) => module.resource && module.resource.startsWith(nodeModules),
        "chunks": [
          "main"
        ]
    }),

    new CommonsChunkPlugin({
      names: ['vendor', 'polyfills', 'inline']
    }),

    // Inject script and link tags into html files
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: './demo/src/public/index.html',
      chunksSortMode: 'dependency'
    }),

    // Extract css files
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin({filename: 'css/[name].[hash].css', disable: !isProd}),

    new webpack.LoaderOptionsPlugin({
      // add debug messages
      debug: !isProd,
      minimize: isProd,
      /**
       * PostCSS
       * Reference: https://github.com/postcss/autoprefixer-core
       * Add vendor prefixes to your css
       */
      postcss: [
        autoprefixer({
          browsers: ['last 2 version']
        })
      ]
    }),

    // Workaround to remove Webpack warning in system_js_ng_module_factory_loader.js
    // See https://github.com/angular/angular/issues/11580
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('demo', 'src', 'app')
    )
  ];

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      // Reference: https://github.com/angular/angular-cli/tree/master/packages/webpack
      new aotplugin.AotPlugin({
        tsConfigPath: './tsconfig-aot.json',
        entryModule: root('demo/src/app/') + 'app.module#NgbdModule'
      }),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoEmitOnErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        output: {comments: false},
        sourceMap: true
      }),

      // Copy assets from the public folder
      // Reference: https://github.com/kevlened/copy-webpack-plugin
      new CopyWebpackPlugin([{
        from: root('demo/src/public')
      }])
    );
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: 'demo/src/public',
    historyApiFallback: true,
    proxy: {
      '/MDX2JSON': {
        target: 'http://localhost:57775/'
      },
      changeOrigin: true,
      secure: false
    },
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  };

  return config;
}();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
