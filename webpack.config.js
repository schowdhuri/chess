const path = require("path");
const webpack = require("webpack")

module.exports = {
    entry: "./app/index.js",
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    output: {
        filename: "chess.min.js",
        path: path.resolve(__dirname, "dist")
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin()
    // ]
};
