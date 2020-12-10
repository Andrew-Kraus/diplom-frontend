const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
entry: {
  index: './src/index.js',
  saved: './src/saved.js'
},
output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
},

module: {
    rules: [{
        test: /\.js$/,
        use: { loader: "babel-loader" },
        exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [(isDev ? "style-loader" : MiniCssExtractPlugin.loader), {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                }, 'postcss-loader'],
            },

            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [

                {
                    loader: 'file-loader',
                    options: {
                    name: '[name][hash].[ext]',
                    outputPath: 'images',
                    esModule: false,
                }
                 },
                ]
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader?name=fonts/[name].[ext]']
        }

        ]
    },



plugins: [
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
    chunkFilename: "[id].[contenthash].css"
}),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
                preset: ['default'],
        },
        canPrint: true
}),
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        inject: true,
        chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      template: 'src/saved.html',
      filename: 'saved.html',
      inject: true,
      chunks: ["saved"]
  }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
]
}