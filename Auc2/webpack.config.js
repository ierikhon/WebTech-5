const nodeExternals = require('webpack-node-externals');


module.exports = {
    mode: 'development',
    entry: './app.js',
    target: "node",
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|lib)/,
                loader: 'babel-loader',
            },

        ]
    },
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },

    externals: [nodeExternals()]
};