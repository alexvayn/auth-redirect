var gulp = require('gulp'),
    bower = require('gulp-bower');

gulp.task('bower', function() {
    return bower('./client/bower_components');
});

gulp.task('default', ['bower']);

gulp.task('clean-coverage', function() {
    'use strict';
    return del(['coverage']);
});