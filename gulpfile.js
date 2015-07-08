var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var header = require('gulp-header');

var pkg = require('./package.json');
var banner = [
  '/**',
  ' * <%= pkg.name %>',
  ' *',
  ' * <%= pkg.description %>',
  ' *',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');

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

gulp.task('lint', function()
{
  gulp
    .src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('dist', function() {
  browserify('./src/gama.js')
    .require('./src/gama.js', {expose: 'gama'})
    .require('ramda', {expose: 'ramda'})
    .bundle()
    .pipe(source('gama.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['lint', 'test'], function()
{
  gulp.watch('./src/*.js', function()
  {
    gulp.run('lint', 'test');
  });
});