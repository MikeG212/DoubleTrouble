const path = require('path');

module.exports = {
    context: __dirname,
    entry: './app/app.js',
    resolve: {
        extensions: [".js", "*"]
    },
    output: {
        path: path.resolve(__dirname),
        filename: "bundle.js"
    },
    devtool: "source-map"
};
