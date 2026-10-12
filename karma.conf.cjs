module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],

    files: ["src/**/*.spec.js"],

    preprocessors: {
      "src/**/*.spec.js": ["webpack"],
    },

    webpack: {
      mode: "development",
      devtool: "inline-source-map",

      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                envName: "test",
              },
            },
          },
        ],
      },

      resolve: {
        extensions: [".js", ".jsx"],
      },
    },

    reporters: ["progress", "coverage"],

    coverageReporter: {
      dir: "coverage",
      reporters: [
        { type: "html", subdir: "html" },
        { type: "lcovonly", subdir: "." },
        { type: "text-summary" },
      ],
    },

    browsers: ["ChromeHeadless"],
    singleRun: true,
    restartOnFileChange: false,
  });
};