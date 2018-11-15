const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: [
            './app.js',
    ],
    target: "node",
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },

            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },

    externals: [nodeExternals()]
};