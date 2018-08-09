const gulp = require('gulp');
const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('default', function () {
    return browserify({ entries: ['./src/index.ts'], standalone: 'ShadowModal' })
        .plugin(tsify)
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(gulp.dest('build'));
});
