
// @file sprite_png.js
var gulp = require('gulp');
var spriteSmith = require('gulp.spritesmith');
var config = require('../config');


gulp.task('spritePNG', function() {
    var spriteData = gulp.src(config.spritePNG.src)
        .pipe(spriteSmith(config.spritePNG.option));
        spriteData.img.pipe(gulp.dest(config.spritePNG.dest1)); // minify images
        spriteData.css.pipe(gulp.dest(config.spritePNG.dest2)); // compile scss
    var spriteDataRetina = gulp.src(config.spritePNG.srcRetina)
        .pipe(spriteSmith(config.spritePNG.optionRetina));
        spriteDataRetina.img.pipe(gulp.dest(config.spritePNG.dest1)); // minify images
        spriteDataRetina.css.pipe(gulp.dest(config.spritePNG.dest2)); // compile scss
});