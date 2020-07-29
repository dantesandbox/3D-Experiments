var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var babel       = require("gulp-babel");
var sourcemaps  = require("gulp-sourcemaps");
var injectModules = require("gulp-inject-modules");


// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
  //watch files
  var files = [
  './assets/sass/*.scss',
  './**/*.php',
  './src/**/*.js',
  './**/*.html'
  ];

  //initialize browsersync
  browserSync.init(files, {
  //browsersync with a php server
  proxy: "http://localhost:8888/three-js",
  notify: true
  });
});

gulp.task('image', function() {
 return gulp.src('./assets/img/*.{png,jpg,jpeg,gif,svg}')
  .pipe(image())
  .pipe(gulp.dest('assets/img'));
});
// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
  return gulp.src([
      'assets/sass/main.scss',
      'assets/sass/wp-core.scss',
      'assets/sass/*.scss'
    ])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('assets/css'))
    .pipe(reload({stream:true}));
});

gulp.task('babel', function () {
  return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

// Default task to be run with `gulp`
gulp.task('default', ['sass', 'browser-sync', 'babel'], function () {
  gulp.watch("assets/sass/**/*.scss", ['sass']);
  gulp.watch("src/**/*.js", ['babel']);

});
