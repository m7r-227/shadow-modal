const gulp = require('gulp');
const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify-es').default;
const header = require('gulp-header');
const fs = require('fs');

gulp.task('default', function () {
    return browserify({ entries: ['./src/index.ts'] })
        .plugin(tsify)
        .bundle()
        .pipe(source('my-userscript.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(header(fs.readFileSync('./headers.js')))
        .pipe(gulp.dest('build'));
});
