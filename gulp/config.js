var path = require("path");
var webpack = require("webpack");
var bourbon = require('node-bourbon');

// @file config.js
var www  = './www'; // ルートディレクトリ
var dest = www + '/assets'; // 出力先ディレクトリ
var src  = www + '/_src';  // ソースディレクトリ
var current = process.cwd(); // node_modulesのルートディレクトリ指定用
var styleguide  = www + '/_styleguide'; // スタイルガイドのディレクトリ

module.exports = {

    // webserverの設定
    webserver: {
        www: www,
        option: {
            host: 'localhost',
            port: '4649',
            livereload: true,
            //directoryListing: true //ディレクトリ一覧を強制表示、ハマりポイント
            open: true
        },
    },

    // jsのビルド設定
    js: {
        src: src + '/javascript/**',
        dest: dest + '/js',
        preserveComments: 'some'
    },

    // webpackの設定
    webpack: {
        entry: {
            app: src + '/javascript/app.js',
            index: src + '/javascript/index.js'
        },
        output: {
            filename: '[name].js'
        },
        resolve: {
            root: path.join(current , 'node_modules'), // package.json でmainに指定してあるものはこれでrequireできる
            alias: {
                // npm installしたjqueryプラグインとかで以下にaliasを貼るとrequire('xxx');のようにパス無しでつかえる
                chosen: current + '/node_modules/chosen-npm/public/chosen.jquery.min.js'
            }
        },
        plugins: [
            new webpack.optimize.DedupePlugin(),  // ライブラリ間で依存しているモジュールが重複している場合、二重に読み込まないようにする
            new webpack.optimize.AggressiveMergingPlugin(), //ファイルを細かく分析し、まとめられるところはできるだけまとめてコードを圧縮する
            // // new webpack.optimize.CommonsChunkPlugin('app','app.js'), // 共通関数を出力する先を限定するやつ
            new webpack.ProvidePlugin({ // JQueryをグローバルに出す設定。これでrequireせず使えるのでjqueryプラグインもそのまま動く。
                $: 'jquery',
                jQuery: 'jquery',
                jquery: 'jquery'
            }),
            new webpack.optimize.UglifyJsPlugin({ //gulp-uglify的なやつ
                compress: { //warning OFF
                    warnings: false
                }
            })
        ],
        devtool: "source-map"
    },

    // sassのビルド設定
    sass: {
        src: src + '/scss/**/*.scss' ,
        dest: dest + '/css',
        option: {
            includePaths: bourbon.includePaths, // node-bourbon settings
            indentedSyntax: true,
            outputStyle: 'expanded'
        },
        sourcemaps: {
            includeContent: false, //インラインじゃなく別ファイルに
            sourceRoot: '../../_src/scss/' // .mapからみた相対scssの場所
        },
        autoprefixer: {
            'browsers': ['last 2 versions']
        }
    },

    // imageのビルド設定
    image: {
        src: [ src + '/img/**/*.+(jpg|jpeg|png|gif|svg)' , '!' + src + '/img/icon/*' , '!' + src + '/img/_sprite/*' , '!' + src + '/img/_sprite@2x/*' ], // ! is ignore
        dest: dest + '/img',
        option: {
            progressive: true,
            interlaced: true,
            optimizationLevel: 6
        }
    },

    // spritePNG(spritesmith)の設定
    spritePNG: {
        src: src + '/img/_sprite/*.png',
        option: {
            imgName: 'sprite.png', //スプライトの画像
            cssName: '_spritePNG.scss', //生成されるscss
            imgPath: '../img/sprite.png' //生成されるscssに記載されるパス
        },
        srcRetina: src + '/img/_sprite@2x/*.png',
        optionRetina: {
            imgName: 'sprite@2x.png',
            cssName: '_spritePNG@2x.scss',
            imgPath: '../img/sprite@2x.png',
            cssVarMap: function (sprite) { // customization of the CSS variable names
                sprite.name = 'r_' + sprite.name;
            }
        },
        dest1: dest + '/img',
        dest2: src + '/scss/_components/'
    },

    // spriteSVGの設定
    spriteSVG: {
        src: src + '/img/icon/*.svg',
        option: {
            'shape': {
                'dimension': {
                    'maxWidth' : 20,
                    'maxHeight': 20
                },
                'spacing': {
                    'padding': 0
                },
                'dest': '../img/_icon' // 単品で上の整形後コピー
            },
            'mode': {
                'view': {
                    'dest': './', // dest以下の directry 構造
                    // 'prefix': 'svg-%s', // Prefix for CSS selectors つけるとテンプレ表示されない
                    'dimensions': true, // 末尾に'-dims'とかつけてサイズのcssを分離trueは合体
                    'sprite': '../img/sprite.svg', // destからの相対パス directry and file name
                    'bust': false, // trueにするとキャッシュ防ぐ用の適当な英数字がつく
                    'render': {
                        'scss': { // Create an SCSS
                            'dest' : '../../_src/scss/_components/_spriteSVG.scss' // rerative dest Dir of scss
                        }
                    },
                    'example': { // Create an HTML example document
                            'dest' : '../img/_iconSvgList.html' // rerative dest Dir
                        }
                }
            }
        },
        dest: dest + '/css'
    },

    // styleguideの設定
    kss: {
        src: src + '/scss/**/*.scss', //コンパイル前のscss
        dest: styleguide, // styleguideディレクトリ
        option: {
            overview: styleguide + '/styleguide.md', // スタイルガイドのトップページ
            templateDirectory: styleguide + '/template/' // スタイルガイドのテンプレを絶対パスで。なかったらkss-node default
        }
    }


};