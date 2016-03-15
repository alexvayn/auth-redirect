var gulp = require('gulp'),
    bower = require('gulp-bower'),
    tar = require('gulp-tar'),
    gzip = require('gulp-gzip'),
    del = require('del'),
    name = require('./package.json').name,
    version = require('./package.json').version;

gulp.task('bower', function() {
    return bower('./client/bower_components');
});

gulp.task('default', ['bower']);

gulp.task('clean-coverage', function() {
    'use strict';
    return del(['coverage']);
});


gulp.task('clean', function() {
    'use strict';
    return del(['dist']);
});

gulp.task('package', ['clean'], function() {
    'use strict';
    return gulp.src(['./**/*', '!*.log', '!{server/test,server/test/**}', '!{coverage,coverage/**}'])
        .pipe(tar(name + '-' + version + '.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('dist'));
});
