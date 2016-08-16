var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    browserSync = require('browser-sync').create();

var config = require('./gulp.config')();
var tsProject = tsc.createProject('tsconfig.json');

gulp.task('default', ['build'], function () {

});

/**
 * Build the project.
 */
gulp.task("build", ['compile-ts', 'styles', 'resources', 'libs'], function () {
    console.log("Building the project ...")
});

gulp.task("watch", ['build'], function () {
    gulp.watch('./src/**/*.ts', './src/**/*.css', './src/**/*.html', './src/**/*.js', ['build'])
});

gulp.task('compile-ts', function (done) {
    var tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build"));
});

gulp.task('styles', function () {
    return sass('src/styles/main.scss', {style: 'expanded'})
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('build/assets/css'))
        .pipe(notify({message: 'Styles task complete'}));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task('resources', function () {
    return gulp.src(['src/**/*', '!**/*.ts'])
        .pipe(gulp.dest('build'))
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task('libs', function () {
    return gulp.src([
        'es6-shim/es6-shim.min.js',
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'reflect-metadata/Reflect.js',
        'rxjs/**',
        'zone.js/dist/**',
        '@angular/**'
    ], {cwd: 'node_modules/**'}) /* Glob required here. */
        .pipe(gulp.dest('build/lib'));
});

gulp.task('inject', function () {

});

gulp.task('clean', function () {
    return del(['build', 'dist/css', 'dist/js', 'dist/img']);
});

function browserSyncInit(baseDir, files) {
    browserSync.instance = browserSync.init(
        files,
        {
            startPath: '/',
            server: {
                baseDir: baseDir
            }
        });
}

// starts a development server
// runs preprocessor tasks before,
// and serves the src and .tmp folders
gulp.task('serve', ['compile-ts', 'styles', 'resources', 'libs', 'inject'],
    function () {
        browserSync.init([
            paths.tmp,
            paths.src
        ], [
            paths.tmp + '/**/*.css',
            paths.tmp + '/**/*.js',
            paths.tmp + '/**/*.html'
        ]);
    });

// starts a production server
// runs the build task before,
// and serves the dist folder
gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(paths.dist);
});