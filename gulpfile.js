var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var useref = require('gulp-useref');
var uncss = require('gulp-uncss');

// BUILDING LOCAL VERSION
  // Runs browsersync on root folder
  gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'src/'
      },
    })
  })

  // Compiles the SASS into CSS
  gulp.task('sass', function(){
    return gulp.src('src/stylesheets/main.scss')
      .pipe(sass({outputStyle: 'compressed'})) // Using gulp-sass - outputs compressed file
      .pipe(gulp.dest('src/stylesheets/'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

  // Watches CSS and JS files for changes and reloads browser
  gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('src/stylesheets/**/*.scss', ['sass']); 
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('**/*.html', browserSync.reload); 
    gulp.watch('js/*.js', browserSync.reload); 
  });

  // Main Gulp Task
  gulp.task('default', function (callback) {
    runSequence(['sass','browserSync', 'watch'],
      callback
    )
  })