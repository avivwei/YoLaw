// var config = {
//     entry: './main.js',
//
//     output: {
//         path:'/',
//         filename: 'index.js',
//     },
//     devServer: {
//         inline: true,
//         port: 8080
//     },
//     externals: {
//         'react': 'React'
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.jsx?$/,
//                 exclude: /node_modules/,
//                 loader: 'babel-loader',
//                 query: {
//                     presets: ['es2015', 'react']
//                 }
//             }
//         ]
//     }
// };
// module.exports = config;

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        inline: true,
        port: 7777
    }
};
