const path = require('path');
const webpack = require('webpack');
const { statSync, readdirSync } = require('fs');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fallback: {
          ...webpackConfig.resolve.fallback,
          buffer: require.resolve('buffer/'),
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve('stream-browserify'),
        },
      };

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),
      );

        webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: 'container-app',
          remotes: {
            socialHub: 'socialHub@http://localhost:8001/remoteEntry.js',
          },
          shared: {
            ...deps,
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: deps['react-dom'],
            },
          },
        }),
      );

      return webpackConfig;
    },
  },
};
