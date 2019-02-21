'use strict';

const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];


// Gulp task to minify CSS files
gulp.task('styles', function () {
    return gulp.src('./html/src/sass/styles.scss')
        // Compile SASS files
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.'],
            onError: console.error.bind(console, 'Sass error:')
        }))
        // Auto-prefix css styles for cross browser compatibility
        .pipe(autoprefixer({
            browsers: AUTOPREFIXER_BROWSERS
            //browsers: ['last 99 versions'],
        }))
        // Minify the file
        .pipe(csso())
        // Output
        .pipe(gulp.dest('./html/dist/css'))
});


// Gulp task to minify JavaScript files
gulp.task('scripts', function () {
    return gulp.src('./html/src/js/**/*.js')
        // Minify the file
        .pipe(uglify())
        // Output
        .pipe(gulp.dest('./html/dist/js'))
});

// Gulp task to minify HTML files
gulp.task('pages', function () {
    return gulp.src(['./html/src/**/*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./html/dist'));
});

// Gulp task to optimize images
gulp.task('images', function () {
    gulp.src('./html/src/images/*.+(png|jpg|gif)')
        //.pipe(imagemin())
        .pipe(gulp.dest('./html/dist/images'))
});

//Watcher tasks
// gulp.task('watch', function () {
//     gulp.watch('./html/src/sass/*.scss', ['styles'])
// });

// Clean output directory
gulp.task('clean', () => del(['./html/dist']));

// Gulp task to minify all files
gulp.task('default', ['clean'], function () {
    runSequence(
        'styles',
        'scripts',
        'pages',
        'images'
    );
});