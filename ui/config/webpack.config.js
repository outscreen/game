const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',

    entry: {
        app: path.resolve(__dirname, '../src/app'),
    },

    output: {
        path: path.resolve(__dirname, '../../public/build/'),
        filename: 'app.js',
    },

    plugins: [],

    node: {
        __dirname: false,
    },

    resolve: {
        extensions: ['', '.js'],
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                },
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
            },
        ],
    },

    exclude: /node_modules/,
};
