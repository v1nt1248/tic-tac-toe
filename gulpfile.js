'use strict'

const gulp = require('gulp')
const gulpIf = require('gulp-if')
const argv = require('yargs').argv
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const ts = require('gulp-typescript')
const browserify = require('browserify')
const sass = require('gulp-sass')
const concatCss = require('gulp-concat-css')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')
const browserSync = require('browser-sync')
const reload = browserSync.reload

const BUILD_PATH = './dist'
const SRC_PATH = './src'
const TMP_PATH = './temp'

gulp.task('del:dist', function() {
  return del([BUILD_PATH])
})

gulp.task('del:tmp', function() {
  return del([TMP_PATH])
})

gulp.task('compile:css', function() {
  return gulp.src(`${SRC_PATH}/**/*.scss`)
    .pipe(gulpIf(!argv.prod, sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpIf(!argv.prod, sourcemaps.write()))
    .pipe(gulp.dest(TMP_PATH))
})

gulp.task('concat:css', function() {
  return gulp.src(`${TMP_PATH}/**/*.css`)
    .pipe(concatCss('index.css'))
    .pipe(gulp.dest(BUILD_PATH))
    .pipe(reload({stream:true}))
})

gulp.task('create:css', gulp.series('compile:css', 'concat:css'))

gulp.task('create:html', function() {
  return gulp.src(
    [
      `${SRC_PATH}/**/*.html`,
      `${SRC_PATH}/**/*.png`,
      `${SRC_PATH}/**/*.jpg`,
      `${SRC_PATH}/**/*.gif`,
      `${SRC_PATH}/**/*.svg`
    ])
    .pipe(gulp.dest(`${BUILD_PATH}`))
    .pipe(reload({stream:true}))
})

gulp.task('compile:js', function() {
  const tsPropject = ts.createProject('tsconfig.json')
  return tsPropject.src()
    .pipe(gulpIf(!argv.prod, sourcemaps.init()))
    .pipe(tsPropject())
    .pipe(gulpIf(!argv.prod, sourcemaps.write()))
    .pipe(gulp.dest(TMP_PATH))
})

gulp.task('concat:js', function() { 
  return browserify({
      entries: `${TMP_PATH}/index.js`,
      debug: true
    })
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulpIf(!argv.prod, sourcemaps.init({loadMaps: true})))
    .pipe(gulpIf(!argv.prod, sourcemaps.write('.')))
    .pipe(gulp.dest(BUILD_PATH))
    .pipe(reload({stream:true}))
})

gulp.task('create:js', gulp.series('compile:js', 'concat:js'))

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: BUILD_PATH
    },
    port: 8080,
    open: true,
    notify: false
  })
})


gulp.task('default', gulp.series('del:dist', gulp.parallel('create:css', 'create:html', 'create:js'), 'del:tmp'))

gulp.task('watch', function() {
  gulp.watch(`${SRC_PATH}/**/*.html`, gulp.series('create:html'))
  gulp.watch(`${SRC_PATH}/**/*.scss`, gulp.series('create:css'))
  gulp.watch(`${SRC_PATH}/**/*.ts`, gulp.series('create:js'))
})

gulp.task('dev', gulp.parallel('watch', 'browserSync'))