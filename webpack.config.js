/*
 * Copyright ©️ 2020 GaltProject Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2020 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

"use strict";

const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const JavaScriptObfuscator = require('javascript-obfuscator');
const Visualizer = require('webpack-visualizer-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const cheerio = require('cheerio');
const _ = require('lodash');

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const UglifyJS = require("uglify-es");
const Terser = require("terser");
const TerserPlugin = require("terser-webpack-plugin");

let webpackMode = 'production';
if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development') {
  webpackMode = 'development';
}

module.exports = function (options = {}) {
  let commonConfig = {
    devtool: webpackMode === 'development' ? 'inline-source-map' : false,
    mode: webpackMode,
    // mode: 'development', //TODO: discover problem with metamask and use webpackMode
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        vue: 'vue/dist/vue.esm.js'
      }
    },
    externals: {
      'websocket': 'window.WebSocket',
      'crypto': 'window.crypto'
    },
    module: {
      rules: [
        {
          test: /(?<!\.d)\.tsx?$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            allowTsInNodeModules: true
          },
          // exclude: /node_modules\/(?!(@galtproject)\/).*/,
          include: [/src/, /node_modules\/@galtproject/].concat(options.tsLoaderInclude || [])
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':data-src'],
              minimize: true
            }
          }
        },
        {
          test: /\.(css)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'build/[name].[ext]',
              }
            },
            MiniCssExtractPlugin.loader
          ],
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        },
        {
          test: /\.scss$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: 'build/app.css',
            }
          },
            'extract-loader',
            // MiniCssExtractPlugin.loader,
            'css-loader?-url&minimize',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(md|MD)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: 'docs/[name].html'
            }
          },
            'extract-loader',
            "html-loader",
            "markdown-loader"
          ]
        }
      ]
    }
  };

  if (!options.path) {
    options.path = __dirname;
  }

  require('dotenv').config({path: options.path + '/.env.' + process.env.NODE_ENV});

  process.env.VERSION = require(options.path + "/package.json").version;

  let defineNodeEnv = {};
  for (const prop in process.env) {
    defineNodeEnv["process.env." + prop] = JSON.stringify(process.env[prop]);
  }

  const plugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '!!underscore-template-loader!./index.html',
      hash: new Date().getTime(),
      prodBackendMode: process.env.PROD_BACKEND,
      prodMode: process.env.PROD,
      inject: false
    }),
    new CopyWebpackPlugin([
      "./CORS",
      {from: "./locale", to: "./locale"},
      {from: "./node_modules/@galtproject/frontend-core/vendor/modernizr-custom.js", to: "./build/modernizr-custom.js"}
    ].concat(options.copy || [])),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin(defineNodeEnv),
    new MiniCssExtractPlugin()
    // new Visualizer({
    //   filename: './build/statistics.html'
    // })
  ];

  if (webpackMode !== 'production') {
    plugins.push(new DuplicatesPlugin());
    plugins.push(new UnusedFilesWebpackPlugin());
    plugins.push(new CircularDependencyPlugin());
  }

  plugins.push({
    apply: (compiler) => {
      compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
        const dirPath = `${options.path}/dist/docs`;
        if(!fs.existsSync(dirPath)) {
          return;
        }
        const files = fs.readdirSync(dirPath);

        files.forEach(function (file) {
          if(_.endsWith(file, 'txt')) {
            return;
          }
          let html = fs.readFileSync(`${dirPath}/${file}`).toString('utf8');
          html = html.replace(/((https?|ftps?):\/\/[^"<\s]+)(?![^<>]*>|[^"]*?<\/a)/g, link => {
            return `<a href="${_.trim(link, '.,')}">${link}</a>`;
          });
          const $ = cheerio.load(html);
          $('a').attr('target', '_blank');
          fs.writeFileSync(`${dirPath}/${file}`, $.html());
        });
      });
    }
  });

  // commonConfig = Object.assign({}, commonConfig, {
  //   externals: options.externals,
  //   optimization: {
  //     minimizer: [
  //       new OptimizeCSSAssetsPlugin({
  //         cssProcessorPluginOptions: {
  //           preset: ['default', { discardComments: { removeAll: true } }],
  //         }
  //       })
  //     ],
  //   }
  // });

  if (webpackMode === 'production') {
    commonConfig = Object.assign({}, commonConfig, {
      optimization: {
        minimize: !options.disableMinimize,
        minimizer: [
          new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            }
          }),
          new TerserPlugin({
            terserOptions: {
              output: {
                comments: false,
              },
              keep_fnames: false,
            },
            extractComments: false,
            // namedModules: false
          })
        ],
        splitChunks: {
          cacheGroups: {
            // 'geesome-libs': {
            //   test: /[\\/]node_modules\/(geesome\-libs.*)[\\/]/,
            //   name: 'geesome-libs.js',
            //   chunks: 'all',
            //   enforce: true,
            //   priority: -5
            // },
            ...(options.cacheGroups || {}),
            vendors: {
              test: /[\\/]node_modules\/.*/,
              name: 'vendors.js',
              chunks: 'all',
              enforce: true,
              priority: -10
            },
            default: {
              minChunks: 3,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
      }
    });

    // plugins.push({
    //     apply: (compiler) => {
    //         compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
    //             const appPath = `${options.path}/dist/build/vendors.js`;
    //             const jsContent = fs.readFileSync(appPath).toString();
    //             const result = Terser.minify(jsContent);
    //             if(result.error) {
    //                 throw result.error;
    //             }
    //             fs.writeFile(appPath, result.code, () => {
    //                 process.stdout.write("✅ Minify vendors.js\n")
    //             });
    //         });
    //     }
    // });

    if(!options.disableObfuscator) {
      plugins.push({
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
            const appPath = `${options.path}/dist/build/app.js`;
            let jsContent = fs.readFileSync(appPath).toString();
            jsContent = Terser.minify(jsContent);
            const obfuscatedContent = JavaScriptObfuscator.obfuscate(jsContent.code, {
              compact: true,
              controlFlowFlattening: true,
              deadCodeInjection: true,
              deadCodeInjectionThreshold: 0.10,
              domainLock: options.domainLock || ['.galtproject.io', '127.0.0.1'],
              selfDefending: true
            });
            fs.writeFile(appPath, obfuscatedContent.getObfuscatedCode(), () => {
              process.stdout.write("✅ Obfuscated app.js\n")
            });
          });
        }
      });
    }
  } else {
    // plugins.push({
    //   apply: (compiler) => {
    //     compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
    //       const appPath = `${options.path}/dist/build/app.js`;
    //       const jsContent = fs.readFileSync(appPath).toString();
    //       const result = UglifyJS.minify(jsContent);
    //       fs.writeFile(appPath, result.code, () => {
    //         process.stdout.write("✅ Minify app.js\n")
    //       });
    //     });
    //   }
    // });
  }

  commonConfig.plugins = plugins;

  return commonConfig;
};
