const gulp = require("gulp4");
const less = require("gulp-less");
const babel = require("gulp-babel");
const rename = require("gulp-rename");
const pug = require('gulp-pug');
const cleanCSS = require("gulp-clean-css");
const minify = require("gulp-uglify");
const cleanHTML = require("gulp-minify-html");
const del = require('del');

const clean = () => {
    return del(["build"]);
};

const styles = () => {
    return gulp.src('./stylesheets/*.less')
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({
            dirname: 'css',
            suffix: '.min'
        }))
        .pipe(gulp.dest('build/'));
};

const w3 = () => {
    return gulp.src('./stylesheets/*.css')
        .pipe(rename({
            dirname: 'css',
        }))
        .pipe(gulp.dest('build/'));
};

const code = () => {
    return gulp.src('./javascripts/*.js ')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minify())
        .pipe(rename({
            dirname: 'javascripts'
        }))
        .pipe(gulp.dest('build/'))
};

const routes = () => {
    return gulp.src('./routes/*.js ')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        //.pipe(minify())
        .pipe(rename({
        }))
        .pipe(gulp.dest('build/'))
};

const core = () => {
    return gulp.src('./*.js ')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('build/'))
};

const views = () => {
    return gulp.src('./views/*.pug')
        .pipe(pug())
        .pipe(cleanHTML())
        .pipe(rename({
            dirname: 'html'
        }))
        .pipe(gulp.dest('build/'))
};

const data = () => {
    return gulp.src('data/**')
        .pipe(gulp.dest('build/data/'))
};

const ssl = () => {
    return gulp.src('ssl/**')
        .pipe(gulp.dest('build/ssl/'));
};

gulp.task("clean", gulp.series(clean));
gulp.task("build", gulp.parallel(styles, w3, code, routes, core, views, data, ssl));
gulp.task("default", gulp.series("clean", "build"));