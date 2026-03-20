const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
    target: 'node', // VS Code extensions run in a Node.js context
    entry: './src/extension.ts', // Entry point for the extension
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: 'extension.js',
        libraryTarget: 'commonjs',
        devtoolModuleFilenameTemplate: '../[resource-path]',
        clean: true, // Cleans the output folder before building
    },
    externals: {
        vscode: 'commonjs vscode', // VS Code module must be excluded from the bundle
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
    devtool: 'nosources-source-map', // Recommended for production extensions
};