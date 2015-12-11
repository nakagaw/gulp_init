// @file sprite_svg.js
var gulp = require('gulp');
var spriteSVG = require('gulp-svg-sprite');
var svgmin = require('gulp-svgmin');
var config = require('../config');

gulp.task('spriteSVG', function() {
    return gulp.src(config.spriteSVG.src)
        .pipe(svgmin())
       .pipe(spriteSVG(config.spriteSVG.option))
       .pipe(gulp.dest(config.spriteSVG.dest));
});
