var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // плагін мінімізації
module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'app': './src/main.ts'
      },
   output:{
       path: path.resolve(__dirname, './public'),     // шлях до каталогу вихідних файлів - папка public
       publicPath: '/public/',
       filename: "[name].js"       // назва файлу, що створюється
   },
   resolve: {
    extensions: ['.ts', '.js']
  },
   module:{
       rules:[   //завантажувач для ts
           {
               test: /\.ts$/, // визначаємо тип файлів
               use: [
                {
                    loader: 'awesome-typescript-loader',
                    options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
                  } ,
                   'angular2-template-loader'
               ]
            }
       ]
   },
   plugins: [
    new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core/,
        path.resolve(__dirname, 'src'), // каталог з вихідними файлами
      {} // карта маршрутів
    ),
    new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'polyfills']
      }),
    new UglifyJSPlugin()
  ]
}
