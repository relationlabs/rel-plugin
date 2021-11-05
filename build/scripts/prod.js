module.exports = {
    mode: 'production',
    optimization: {
        runtimeChunk: false,
        /*
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
        */
    },
};