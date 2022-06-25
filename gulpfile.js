import gulp from "gulp";
import htmlmin from "gulp-htmlmin";
import concat from "gulp-concat";
import terser from 'gulp-terser';
import autoPrefixer from "gulp-autoprefixer";
import cleancss from 'gulp-clean-css'
import clean from 'gulp-clean'
import imagemin from "gulp-imagemin";
import browserSync from "browser-sync";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

const bS = browserSync.create();
const sass = gulpSass(dartSass);

const buildStyles = () => gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'));

const cleanFolder = () => gulp.src('./dist/*', {
    read: false
}).pipe(clean());

const htmlMin = () => gulp.src("./*.html")
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist/'));

const autoPref = () => (
    gulp.src('./dist/**/*.css')
    .pipe(autoPrefixer({
        cascade: false
    }))
    .pipe(gulp.dest('dist'))
);

const css = () => gulp.src("./src/**/*.css")
    .pipe(concat('styles.min.css'))
    .pipe(cleancss())
    .pipe(gulp.dest('./dist/'));

const js = () => gulp.src("./src/**/*.js")
    .pipe(concat('script.min.js'))
    .pipe(terser())
    .pipe(gulp.dest('./dist/'));

const minImage = () => gulp.src("./src/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));

export const build = gulp.series(cleanFolder, buildStyles, gulp.parallel(css, js, htmlMin, minImage), autoPref)

export const dev = gulp.series(buildStyles, () => {
    bS.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['./src/**/*.js', './*.html', './src/**/*.scss'], gulp.series(build, (done) => {
        bS.reload();
        done();
    }));
});