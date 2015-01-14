var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('test', function()
{
  gulp
    .src('./src/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function ()
    {
      gulp.src('./test/*.js')
        .pipe(mocha())
        .pipe(istanbul.writeReports());
    });
});

gulp.task('linter', function()
{
  gulp
    .src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('dist', function() {
  browserify('./src/gama.js')
    .require('./src/gama', {expose: 'gama'})
    .require('ramda', {expose: 'ramda'})
    .bundle()
    .pipe(source('gama.bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['linter', 'test'], function()
{
  gulp.watch('./src/*.js', function()
  {
    gulp.run('linter', 'test');
  });
});