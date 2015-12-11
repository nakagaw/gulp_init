// @file watch.js
var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config');

gulp.task('watch', function () {
    // js
    watch(config.js.src, function () {
        gulp.start(['webpack']);
    });

    // sass
    watch(config.sass.src, function () {
        gulp.start(['sass']);
    });

    // kss
    watch(config.sass.src, function () {
        gulp.start(['kss']);
    });
});
