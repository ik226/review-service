const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

// disable for nestjs swagger plugin
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal
    ? 'cheap-module-eval-source-map'
    : 'source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts'],
    symlinks: false,
    cacheWithContext: false,
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        // options: {
        //   // disable for nestjs swagger plugin
        //   // transpileOnly: true,
        //   experimentalWatchApi: true,
        //   getCustomTransformers: (program) => ({
        //     before: [
        //       require('@nestjs/swagger/plugin').before(
        //         {
        //           dtoFileNameSuffix: [
        //             '.dto.ts',
        //             '.entity.ts',
        //             '.ro.ts',
        //             '.response.ts',
        //             '.collection.ts',
        //           ],
        //         },
        //         program,
        //       ),
        //     ],
        //   }),
        // },
      },
    ],
  },
  plugins: [
    // new CopyPlugin({
    //   patterns: ['swagger.json'],
    // }),
    // disable for nestjs swagger plugin
    // new ForkTsCheckerWebpackPlugin({
    //   eslint: true,
    //   eslintOptions: {
    //     cache: true
    //   }
    // })
  ],
  /**
   * minimize로 인해 mangle되어 Module 내 다중 Controller의
   * Router를 인식하지 못함
   * issue link: `https://github.com/nestjs/nest/issues/3034`
   */
  optimization: {
    minimize: false,
  },
};
