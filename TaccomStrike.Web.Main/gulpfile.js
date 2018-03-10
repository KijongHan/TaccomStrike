var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('css', function () {
    return gulp.src('wwwroot/css/*.css')
        .pipe(concatCss("app.min.css"))
        .pipe(gulp.dest('wwwroot/lib'))
});

gulp.task('js', function () {
    return gulp.src('wwwroot/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('wwwroot/lib'))
});

gulp.task('default', ['css', 'js']);