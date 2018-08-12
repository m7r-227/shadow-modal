const gulp = require('gulp');
const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify-es').default;

gulp.task('standalone', function () {
    return browserify({ entries: ['./src/index.ts'], standalone: 'ShadowModal' })
        .plugin(tsify)
        .bundle()
        .pipe(source('shadow-modal.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('build-standalone'));
});
