let path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './app.js',
    target: "node",
    module:{

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CopyPlugin([
            {from: './stylesheets/**', to: ''},
            {from: './routes/**', to: ''},
            {from: './views/**', to: ''},
            {from: './javascripts/**', to: ''},
            {from: './data/**', to: ''}
        ])
    ],
    externals: [nodeExternals()]
};