// @file webpack.js
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var config = require('../config');

gulp.task('webpack', function () {
    return gulp.src(config.js.src)
        .pipe(webpack(config.webpack))
        .pipe(gulp.dest(config.js.dest));
});
