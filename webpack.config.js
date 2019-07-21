module.exports = {
    entry: ['./src/movieApp/js/index.js', './src/shopApp/js/index.js', './src/layout.js'],
    output: {
        path: require('path').resolve(__dirname, 'final'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './final'
    }
}