var browserSync  = require('browser-sync');
var watchify     = require('watchify');
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var gulpSequence = require('gulp-sequence');
var processhtml  = require('gulp-minify-html');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var watch        = require('gulp-watch');
var minifycss    = require('gulp-minify-css');
var uglify       = require('gulp-uglify');
var streamify    = require('gulp-streamify');
var sourcemaps   = require('gulp-sourcemaps');
var concat       = require('gulp-concat');
var babel        = require('gulp-babel');
var prod         = gutil.env.prod;
var rev         = require('gulp-date-rev');

var onError = function(err) {
  console.log(err.message);
  this.emit('end');
};

// js
gulp.task('js', function() {
    return gulp.src(['./src/js/**/*']).pipe(rev('./build/js')).pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
});

// images
gulp.task('images', function() {
    return gulp.src(['./src/images/**/*']).pipe(gulp.dest('./build/images'))
    .pipe(browserSync.stream());
});

// html
gulp.task('html', function() {
  return gulp.src('./src/templates/**/*')
    .pipe(processhtml())
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

// sass
gulp.task('sass', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass({
      //includePaths: [].concat(['node_modules/foundation-sites/scss', 'node_modules/motion-ui/src'])
      //includePaths: [].concat(['node_modules/foundation-sites/scss', 'node_modules/motion-ui/src'])
    }))
    .on('error', onError)
    .pipe(prod ? minifycss() : gutil.noop())
    .pipe(prod ? autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }) : gutil.noop())
    .pipe(gulp.dest('./build/stylesheets'))
    .pipe(browserSync.stream());
});

// browser sync server for live reload
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });

  gulp.watch('./src/js/*', ['js']);
  gulp.watch('./src/images/*', ['images']);
  gulp.watch('./src/templates/**/*', ['html']);
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});

// deploy to gh-pages
gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

// use gulp-sequence to finish building html, sass and js before first page load
gulp.task('default', gulpSequence(['html', 'sass', 'js', 'images'], 'serve'));