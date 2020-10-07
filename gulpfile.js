const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function css() {
    return src('./src/sass/*.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(dest('./dist/css'), { sourcemaps: true })
        .pipe(browserSync.stream());
}

function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        files: [
            './**/*.html',
            './**/*.js'
        ]
    });
    watch('./src/sass/**/*.scss', css)
}

exports.css = css;
exports.watch = browser;

