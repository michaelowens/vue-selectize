var gulp = require('gulp'),
    umd = require('gulp-umd'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header'),
    rename = require('gulp-rename'),
    pkg = require('./package.json'),
    del = require('del'),
    fs = require('fs'),
    bannerTemplate = fs.readFileSync('banner.tmpl', 'utf8');

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('default', ['clean'], function () {
    return gulp.src('src/*.js')
        .pipe(umd({
            exports: function(file) {
                return 'VueSelectize';
            },
            namespace: function(file) {
                return 'VueSelectize';
            }
        }))
        .pipe(header(bannerTemplate, { pkg : pkg } ))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(header(bannerTemplate, { pkg : pkg } ))
        .pipe(rename(function (path) {
            path.extname = '.min.js';
        }))
        .pipe(gulp.dest('dist'));
});
