const gulp = require('gulp');
const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('default', function () {
    return browserify({ entries: ['./src/export.js'], standalone: 'ShadowModal' })
        .plugin(tsify)
        .bundle()
        .pipe(source('ShadowModal.js'))
        .pipe(buffer())
        .pipe(gulp.dest('build'));
});
