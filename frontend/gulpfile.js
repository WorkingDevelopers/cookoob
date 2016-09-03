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

var tsProject = tsc.createProject('tsconfig.json');

var paths = {
    scripts: ['src/app/**/*', '!client/external/**/*.coffee'],
    scripts_js: ['src/app/**/*.js', '!client/external/**/*.ts'],
    html: ['src/*.html'],
    views: ['src/views/**/*.html'],
    images: ['src/img/**/*'],
    styles: 'src/styles/**/*',
    styles_css: 'src/styles/**/*.css',
    styles_sass: 'src/styles/**/*.scss',
    assets: ['src/**/*.png', 'src/**/*.jpg', 'src/*.js', 'src/styles/**/*.css'],
    libs: [
        // 'es6-shim/es6-shim.min.js',
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'reflect-metadata/Reflect.js',
        'core-js/client/**',
        'rxjs/**',
        'zone.js/dist/**',
        '@angular/**'
    ]
};

gulp.task('default', ['clean', 'build'], function () {

});

/**
 * Build the project.
 */
gulp.task('build', ['build-scripts', 'build-styles', 'copy:resources', 'libs', 'inject'], function () {
    console.log('Building the project ...')
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['build-scripts']);
    gulp.watch(paths.images, ['copy:resources']);
    gulp.watch(paths.styles, ['build-styles']);
    gulp.watch(paths.assets, ['copy:resources']);
    gulp.watch(paths.html, ['copy:resources']);
    gulp.watch(paths.views, ['copy:resources']);
    // gulp.watch(['./gulpfile.js', './*.json'], ['build']);
});

gulp.task('build-scripts', ['compile-ts'], function (done) {
    return gulp.src(paths.scripts_js)
        .pipe(gulp.dest('build'))
});

gulp.task('compile-ts', function (done) {
    var tsResult = gulp
        .src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build'));
});

gulp.task('build-styles', function () {
    return sass(paths.styles_sass, {style: 'expanded'})
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('build/styles/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        // .pipe(gulp.dest('build/assets/css'))
        .pipe(notify({message: 'Styles task complete'}));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task('copy:resources', function () {
    gulp.src(paths.images)
        .pipe(gulp.dest('build'));
    gulp.src(paths.assets)
        .pipe(gulp.dest('build'));
    gulp.src(paths.html)
        .pipe(gulp.dest('build'));
    gulp.src(paths.views)
        .pipe(gulp.dest('build/views'));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task('libs', function () {
    return gulp.src(paths.libs, {cwd: 'node_modules/**'}) /* Glob required here. */
        .pipe(gulp.dest('build/lib'));
});

gulp.task('inject', function () {

});

gulp.task('clean', function () {
    return del(['build']);
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
gulp.task('serve', ['build'], function () {
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
