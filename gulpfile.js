'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('build', () => {
  return gulp
    .src('./src/page-break.js')
    .pipe(concat('page-break.js'))
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-object-assign']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['build']);
