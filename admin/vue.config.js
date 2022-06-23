const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
module.exports = {
    pluginOptions:{
      'style-resources-loader':{
        preProcessor:'scss',
        patterns:[]
      }
    },
    configureWebpack: {
        plugins: [
            //copy-webpack-plugin 5.x 的写法
            new CopyWebpackPlugin([{
                from: "src/Cesium/Source/Workers",
                to: 'cesium/Workers'
            }]),
            new CopyWebpackPlugin([{
                from: "src/Cesium/Source/Assets",
                to: 'cesium/Assets'
            }]),
            new CopyWebpackPlugin([{
                from: "src/Cesium/Source/Widgets",
                to: 'cesium/Widgets'
            }]),
            new CopyWebpackPlugin([{
                from: "src/Cesium/ThirdParty",
                to: 'cesium/ThirdParty'
            }]),

            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify("./cesium")
            })
        ],
        module: {
            unknownContextCritical: false,
            unknownContextRegExp: /\/cesium\/cesium\/Source\/Core\/buildModuleUrl\.js/
        }
    },
}