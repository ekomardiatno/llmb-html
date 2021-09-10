var gulp = require('gulp'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  clean = require('gulp-clean-css'),
  include = require('gulp-file-include'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  saveLicense = require('uglify-save-license'),
  sourceMaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  config = {
    bower: 'bower_components'
  }

sass.compiler = require('node-sass')

// Build HTML
function html() {

  return gulp.src('./src/pages/*.html')
    .pipe(include())
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())

}

// Compile CSS
function styles() {

  return gulp.src([
    './src/scss/*.scss'
  ])
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(clean())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(connect.reload())

}

// Combine JS
function scripts() {

  return gulp.src('./src/js/*.js')
    .pipe(sourceMaps.init())
    .pipe(concat('scripts.js'))
    .pipe(uglify({
      output: {
        comments: saveLicense
      }
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(connect.reload())

}

// Export Fonts
function fonts() {

  return gulp.src([
      'src/fonts/*.**',
      config.bower + '/lightgallery/dist/fonts/*.**'
    ])
    .pipe(gulp.dest('./dist/assets/fonts'))
    .pipe(connect.reload())

}

// Export CSS Libs
function css() {

  return gulp.src([
      config.bower + '/bootstrap/dist/css/bootstrap.min.css',
      config.bower + '/bootstrap/dist/css/bootstrap.min.css.map',
      config.bower + '/lightgallery/dist/css/*.**',
      config.bower + '/owl.carousel/dist/assets/owl.carousel.min.css',
      config.bower + '/owl.carousel/dist/assets/owl.theme.default.min.css',
    ])
    .pipe(gulp.dest('./dist/assets/css'))

}

// Export JS Libs
function js() {

  return gulp.src([
      config.bower + '/jquery/dist/jquery.min.js',
      config.bower + '/jquery/dist/jquery.min.map',
      config.bower + '/popper.js/dist/umd/popper.min.js',
      config.bower + '/popper.js/dist/umd/popper.min.js.map',
      config.bower + '/bootstrap/dist/js/bootstrap.min.js',
      config.bower + '/bootstrap/dist/js/bootstrap.min.js.map',
      config.bower + '/lightgallery/dist/lightgallery.min.js',
      config.bower + '/lightgallery/dist/plugins/*/*.min.js',
      config.bower + '/owl.carousel/dist/owl.carousel.min.js',
    ])
    .pipe(gulp.dest('./dist/assets/js'))

}

// Export Images
function images() {

  return gulp.src([
      './src/images/*.**',
      './src/images/*/*.**',
      config.bower + '/lightgallery/dist/images/*.**'
    ])
    .pipe(gulp.dest('./dist/assets/images'))
    .pipe(connect.reload())

}

// Watch
function watch(done) {

  gulp.watch([
    './src/pages/*.html',
    './src/inc/*.html'
  ], html)

  gulp.watch([
    './src/scss/*.scss',
    './src/scss/*/*.scss',
    './src/scss/*/*/*.scss'
  ], styles)

  gulp.watch([
    './src/fonts/*.**'
  ], fonts)

  gulp.watch('./src/js/*.js', scripts)

  gulp.watch([
    './src/images/*.**',
    './src/images/*/*.**'
  ], images)

  done()

}

// Start server
function server(done) {

  connect.server({
    root: './dist',
    livereload: true
  })

  done()

}

gulp.task('export', gulp.series(fonts, css, js, images))

gulp.task('default', gulp.series(server, fonts, css, js, watch, html, styles, scripts, images))

gulp.task('dev', gulp.series(server, watch, html, styles, scripts))