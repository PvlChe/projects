'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browser = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
 
gulp.task('prefixer', () =>
    gulp.src('app/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('server', function (done) {
  browser.init({
    server: {
 			baseDir: 'app'
 		},
    port: 8080,
    open: true,
    notify: false
  });
  done()
});

gulp.task('reload', function(done) {
  browser.reload();
  done();
});

gulp.task('sass', function() {
  return gulp.src('app/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css/'))
    .pipe(browser.reload({
      stream: true
    }));
});


gulp.task('watch', function() {
  gulp.watch('app/sass/main.scss', gulp.series('sass'));
  gulp.watch('app/sass/rent.scss', gulp.series('sass'));
});

gulp.task('default',
  gulp.series('sass','prefixer','server','watch'));