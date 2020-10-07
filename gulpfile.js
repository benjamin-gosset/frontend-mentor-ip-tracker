const GulpClient = require('gulp');
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
            './**/*.html'
        ]
    });
    watch('./src/sass/**/*.scss', css),
    watch('./**/*.js', js)
}

function js() {
    return src([
        './node_modules/leaflet/dist/leaflet.js',
        './src/js/**/*.js'
    ])
    .pipe(dest('./dist/js'));
}

exports.css = css;
exports.watch = browser;

