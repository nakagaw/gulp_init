// default
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default',function(callback) {
    runSequence(
        ['sass', 'webpack','image'],
        'kss',
        'webserver',
        'watch',
    callback);
});

// build
gulp.task('build',function(callback) {
    runSequence(
        ['sass', 'webpack','image'],
    callback);
});

// sv
gulp.task('sv',function(callback) {
    runSequence(
        'webserver',
        'watch',
    callback);
});

// ※先にgulp spriteをしないと_sprite.scssがないので、sassでコンパイルエラー出ます
gulp.task('sprite',function(callback) {
    runSequence(
        'spritePNG',
        'spriteSVG',
    callback);
});
