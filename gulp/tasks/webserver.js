// @file webserver.js
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var config = require('../config');

gulp.task('webserver', function() {
    gulp.src(config.webserver.www)
        .pipe(webserver(config.webserver.option));
});

