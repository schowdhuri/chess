const path = require("path");
const webpack = require("webpack");

module.exports = function (env) {
    const dev = Boolean(env && env.dev);
    const watch = Boolean(env && env.watch);
    const plugins = [];
    let filename;
    if(dev) {
        filename = "chess.js";
    } else {
        plugins.push(new webpack.optimize.UglifyJsPlugin());
        filename = "chess.min.js"
    }

    return {    
       entry: "./app/index.js",
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }]
        },
        output: {
            filename: filename,
            path: path.resolve(__dirname, "dist")
        },
        plugins: plugins,
        watch: watch
    };
}
