module.exports = function (config) {
  config.set({

    frameworks: ["jasmine", "karma-typescript"],

    files: [
      { pattern: "base.spec.ts" },
      { pattern: "src/**/*.ts" }
    ],

    preprocessors: {
      "**/*.ts": ["karma-typescript"]
    },

    karmaTypescriptConfig: {
      tsconfig: 'tsconfig.test.json',
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/,
        transforms: [
          require("karma-typescript-angular2-transform")
        ]
      },
      compilerOptions: {
        lib: ["ES2015", "DOM"]
      }
    },

    reporters: ["progress"],

    browsers: ["Chrome"]
  });
};
