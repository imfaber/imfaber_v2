var gulp        = require('gulp'),
    compass     = require('gulp-compass'),
    watch       = require('gulp-watch'),
    concat      = require('gulp-concat'),
    path        = require('path'),
    taskListing = require('gulp-task-listing');

// Compass
gulp.task('compile-sass', function() {
  gulp.src(__dirname + '/sass/**/*.scss')
  .pipe(compass({
    project: __dirname,
    css: 'css',
    sass: 'sass'
  }))
  .on('error', function(err) {
    console.log(err);
  })
  .pipe(gulp.dest('css'));
});

// Scripts
gulp.task('compile-js', function() {
  gulp.src([
    __dirname + '/js/src/**/app.js',
    __dirname + '/js/src/**/_*.js'
  ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(__dirname + '/js/dist/'))
});

// Compile
gulp.task('compile', ['compile-sass', 'compile-js']);

// Watch sass
gulp.task('watch-sass', function() {
  watch({glob: __dirname + "/sass/**/*.scss"}, function() {
      gulp.start("compile-sass");
  });
});

// Watch js
gulp.task('watch-js', function() {
  watch({glob: __dirname + "/js/src/**/*.js"}, function() {
      gulp.start("compile-js");
  });
});

// Watch
gulp.task('watch', ['watch-sass', 'watch-js']);

// Dir
gulp.task('pwd', function() {
  console.log(__dirname);
});

// Add a task to render the output
gulp.task('help', taskListing);
