const cssnano = require('cssnano');
const merge = require('webpack-merge');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 查看打包速度
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
// 查看包大小
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = require('./webpack.base');

const smp = new SpeedMeasureWebpackPlugin();

const prodConfig = {
  mode: 'production',
  plugins: [
    // 代码压缩
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    // new BundleAnalyzerPlugin(),
    // 提取公共代码（缺点：一个基础库指定一个 CDN）
    new HtmlWebpackExternalsPlugin({
      externals: [{
        module: 'react',
        entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
        global: 'React',
      },
      {
        module: 'react-dom',
        entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
        global: 'ReactDOM',
      },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
    // 并行压缩
    minimizer: [
      new TerserPlugin({
        parallel: true
      })
    ]
  },
};

module.exports = smp.wrap(merge(baseConfig, prodConfig));
