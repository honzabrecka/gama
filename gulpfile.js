var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('test', function() {
  gulp
    .src('./src/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src('./test/*.js')
        .pipe(mocha())
        .pipe(istanbul.writeReports());
    });
});

gulp.task('lint', function() {
  gulp
    .src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['lint', 'test'], function() {
  gulp.watch('./src/*.js', function() {
    gulp.run('lint', 'test');
  });
});
