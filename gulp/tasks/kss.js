// @file kss.js
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var gulpkss = require('gulp-kss-sass');
var config = require('../config');

gulp.task('kss', function() {
    // Sass Compile and Copy css for style guide
    gulp.src(config.kss.src)
        .pipe(sass(config.sass.option).on('error', sass.logError))
        .pipe(autoprefixer(config.sass.autoprefixer))
        .pipe(gulp.dest(config.kss.dest));

    // Make style guide
    gulp.src(config.kss.src)
        .pipe(gulpkss(config.kss.option))
        .pipe(gulp.dest(config.kss.dest));
});