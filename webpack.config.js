var Encore = require('@symfony/webpack-encore');

Encore
    .enableSassLoader()
    .setOutputPath('dist/')
    .setPublicPath('/dist')

    .enableVueLoader()

    .addEntry('app', './assets/app.js')
    .addEntry('modalWindow', './assets/app.js')

    .splitEntryChunks()

    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

;

module.exports = Encore.getWebpackConfig();
