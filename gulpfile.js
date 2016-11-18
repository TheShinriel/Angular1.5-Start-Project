'use strict';

var gulp            = require('gulp'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    connect         = require('gulp-connect'),
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    prefix          = require('gulp-autoprefixer'),
    runSequence     = require('run-sequence'),
    maps            = require('gulp-sourcemaps'),
    cleanCSS        = require('gulp-clean-css'),
    clean           = require('gulp-clean');

var scssFiles = './src/**/*.scss';
var htmlFile = './src/index.html';
var manualAddedFonts = './src/fonts/**/*.*';
var fonts = [
    './node_modules/font-awesome/fonts/**/*.*',
    manualAddedFonts
];
// Add your external libs css here
var libCssFiles = [
    './node_modules/normalize.css/*.css',
    './node_modules/foundation-sites/dist/foundation-flex.min.css',
    './node_modules/font-awesome/css/font-awesome.min.css'
];
// Add your external libs js here
var libJsFiles = [
];
var finalVersionFolder = './public/';
var finalScriptFolder = finalVersionFolder + 'js/';
var finalStyleFolder = finalVersionFolder + 'css/';
var finalFontFolder = finalVersionFolder + 'fonts/';

// Styles Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('libcss', function () {
    return gulp.src(libCssFiles)
        .pipe(concat('libs.css'))
        .pipe(cleanCSS({compatibility: 'ie10'}))
        .pipe(gulp.dest(finalStyleFolder))
        .pipe(connect.reload());
});

gulp.task('libjs', function () {
    return gulp.src(libJsFiles)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(finalScriptFolder))
        .pipe(connect.reload());
});

gulp.task('sass', function() {
  return gulp.src(scssFiles)
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(concat('site.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest(finalStyleFolder))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src(htmlFile)
    .pipe(gulp.dest(finalVersionFolder))
    .pipe(connect.reload());
});

gulp.task('fonts', function() {
    gulp.src(fonts)
        .pipe(gulp.dest(finalFontFolder))
        .pipe(connect.reload());
});

// Angular Gulp tasks
// ----------------------------------------------------------------------------
 var browserify     = require('browserify'),
     babelify       = require('babelify'),
     gutil          = require('gulp-util'),
     source         = require('vinyl-source-stream'),
     ngAnnotate     = require('browserify-ngannotate'),
     templateCache  = require('gulp-angular-templatecache');

var ngFiles = './src/**/*.js';
var ngAppFile = './src/app.js';
var ngFinalAppFile = 'mainJs.js';
var ngTemplatesFile = 'app.templates.js';
var configFolder = './src/config/';
var viewFiles = "src/**/*.html";

gulp.task('ng', function () {
    return bundleApp(false).pipe(connect.reload());
});
 
gulp.task('deploy', function (){
    bundleApp(true);
});

// Generate a cache for templates
gulp.task('views', function() {
    return gulp.src(viewFiles)
        .pipe(templateCache({
            standalone: true
        }))
        .on('error', gutil.log)
        .pipe(rename(ngTemplatesFile))
        .pipe(gulp.dest(configFolder));
});


// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
    // Browserify will bundle all our js files together in to one and will let
    // us use modules in the front end.
    var appBundler = browserify({
        entries: ngAppFile,
        debug: !isProduction
    })
 
    return appBundler
        // transform ES6 to ES5 with babelify
        .transform(babelify, {
            presets: ["es2015"]
        })
        .transform(ngAnnotate)
        .bundle()
        .on('error', gutil.log)
        .pipe(source(ngFinalAppFile))
        .pipe(gulp.dest(finalScriptFolder));
}

// Common Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('watch', function() {
  gulp.watch(scssFiles,['sass']);
  gulp.watch(htmlFile,['html']);
  gulp.watch(libCssFiles,['libcss']);
  gulp.watch(libJsFiles,['libjs']);
  gulp.watch(ngFiles,['ng']);
  gulp.watch(viewFiles,['views', 'ng']);
});

gulp.task('connect', function () {
    connect.server({
        root: finalVersionFolder,
        livereload: true,
        port: 4000
    })
});
 
gulp.task('clean', function (){    
    return gulp.src(finalVersionFolder, {read: false})
        .pipe(clean());
});

gulp.task('default', function(callback) {
    runSequence('clean', 'html', 'sass', 'views', 'ng', 'libcss', 'libjs', 'fonts', 'watch', 'connect',
        callback
    );
});
