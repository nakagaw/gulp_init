// @file image.js
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var config = require('../config');

gulp.task('image', function () {
    return gulp.src(config.image.src)
    .pipe(imagemin(config.image.option))
    .pipe(gulp.dest(config.image.dest));
});
