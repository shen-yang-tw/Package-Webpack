const devMode = process.env.NODE_ENV === 'development'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin") //A webpack plugin to remove/clean your build folder(s)
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  entry: {
    //the entry name will output to the 'filename', and the entry name order goes the same to the html <link>
    app: './src/index.js',
    style: ['./src/scss/base.scss', './src/scss/main.scss', './src/scss/colors.scss', './src/scss/style.scss'],
    script: './src/js/script.js',
    //https://webpack.js.org/guides/entry-advanced/#multiple-file-types-per-entry
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', //add directory path to output css files, [name] comes from entry name
      // chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
    new HtmlWebpackPlugin({ //must be necessary with MiniCssExtractPlugin.loader
      title: 'Index',
      filename: 'index.html',
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin({ //must be necessary with MiniCssExtractPlugin.loader
      title: 'News',
      filename: 'news.html',
      template: './src/news.html',
    }),
  ],
  output: {
    filename: 'js/[name].bundle.js', //[name] is the name of js from 'entry'
    chunkFilename: 'js/[name].bundle.js', //For Dynamic-Imports, https://webpack.js.org/guides/code-splitting/#dynamic-imports
  },
  module: {
    rules: [{
        test: /\.(jpe?g|gif|png|svg|webp)$/i,
        use: [{
          loader: "file-loader",
          options: {
            outputPath: 'img', //'outputPath' is only for 'file-loader'
            name: "[name].[ext]", //only for 'file-loader'
            esModule: false, //**Important** if removed will get error in <img src="[object Module]">
          },
        }, ]
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 8192,
      //   },
      // },
      {
        // this will apply to both plain `.js` files
        // AND `<script>` blocks in `.vue` files
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
              publicPath: '../', //target to the assets(images) path: relative to where 'file-loader' emits them to the outputPath, where the assets(img,js,fonts) are located
            },
          },
          'css-loader', //2. Turns css into commonjs
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
                // purgecss({
                //   content: ['./**/*.html', './**/js/*.js'], //js path must be right or classes in js will be removed by purgecss
                //   // whitelist: ['opacity-100', "text-m", "text-l", "text_size", "text_size-s", "text_size-m", "text_size-l", "active"],
                //   // Include any special characters you're using in this regular expression
                //   defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
                // }),
                ...devMode ? [] : [purgecss({
                  content: ['./**/*.html', './**/js/*.js'], //js path must be right or classes in js will be removed by purgecss
                  // whitelist: ['opacity-100', "text-m", "text-l", "text_size", "text_size-s", "text_size-m", "text_size-l", "active"],
                  // Include any special characters you're using in this regular expression
                  // defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
                  // defaultExtractor: content => content.match(/[A-Za-z0-9-_:/!]+/g) || [],
                  defaultExtractor: content => content.match(/[\w-/:!@]+(?<!:)/g) || [],
                })]
              ],
            },
          },
          "sass-loader", //1. Turns sass into css
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            // attrs: [':data-src'] //https://webpack.js.org/loaders/html-loader/#usage
            // attrs: false, //for uikit img lazy loding ?
            minimize: devMode ? false : true,
          }
        }
      },
    ]
  }
};