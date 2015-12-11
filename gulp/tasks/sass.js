// @file sass.js
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var scsslint = require('gulp-scss-lint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cmq = require('gulp-combine-media-queries');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');
var gulpif = require('gulp-if');
var sourcemaps= require('gulp-sourcemaps');
var config = require('../config');

// gulp-if用の設定
var minimist = require('minimist'); // CLI入力を解析
var production = !!(minimist.production);
var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'develop now...' } // NODE_ENVに指定がなければ開発モードをデフォルトにする
};
var options = minimist(process.argv.slice(2), knownOptions),
      isComp = (options.env === 'comp') ? true : false; //--env comp なら ture
console.log('[mode]', options.env, '[comp?]', isComp);

gulp.task('sass', function () {
    gulp.src(config.sass.src)
        // .pipe(scsslint({
        // 'config': '.scss-lint.yml',
        // 'maxBuffer': 307200
        // }))
        .pipe(plumber()) //watch中のエラー停止防止
        .pipe(sourcemaps.init()) // 初期化
        .pipe(sass(config.sass.option).on('error', sass.logError))
        .pipe(autoprefixer(config.sass.autoprefixer))
        /*--env comp*/ .pipe(gulpif(options.env === 'comp', cmq())) //メディアクエリまとめ
        /*--env comp*/ .pipe(gulpif(options.env === 'comp', csscomb())) //プロパティ並び替え
        /*--env comp*/ .pipe(gulpif(options.env === 'comp', csso())) // 最適化
        .pipe(sourcemaps.write('./', config.sass.sourcemaps)) //dist以下の書き出し先, option
        .pipe(gulp.dest(config.sass.dest));
});

