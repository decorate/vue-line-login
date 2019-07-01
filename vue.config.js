module.exports = {
    configureWebpack: config => {
        delete config.devtool
        delete config.output.libraryExport
    },
    chainWebpack: config => {
        config.externals({
            axios: true
        })
    }
}
