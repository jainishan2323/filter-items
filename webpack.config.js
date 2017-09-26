var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'app.bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader'],
                    publicPath: './'
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.png$/,
                use: 'file-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Demo',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: false,
            allChunks: true
        })
    ]
}