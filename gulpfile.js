var gulp = require('gulp')
var pack = require('./pack_manifest.json')
var jsonminify = require('gulp-jsonminify')
var luaminify = require('gulp-luaminify')
var del = require('del')
var runSequence = require('run-sequence')
const imagemin = require('gulp-imagemin')

gulp.task('plugin', function () {
  console.log('Compiling Plugins for ' + pack.name + '...')
  return gulp.src(['pack_manifest.json', '**/*.json', '!/node_modules/'])
    .pipe(jsonminify())
    .pipe(gulp.dest('build'))
})

gulp.task('resource', function () {
  console.log('Optimizing resources and assets for ' + pack.name + '...')
  return gulp.src(['resource/**/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('build/resource'))
})

gulp.task('icon', function () {
  console.log('Optimizing icon for ' + pack.name + '...')
  return gulp.src(['icon.png'])
    .pipe(imagemin())
    .pipe(gulp.dest('build'))
})

gulp.task('clean', () => del(['build']))

gulp.task('lua', function () {
  console.log('Compiling Lua scripts for ' + pack.name + '...')
  return gulp.src(['logical/*.lua'])
    .pipe(luaminify())
    .pipe(gulp.dest('build/logical'))
})

gulp.task('build', ['clean'], function () {
  console.log('Compiling ' + pack.name + '...')
  runSequence(
    'plugin',
    'lua',
    'icon',
    'resource'
  )
})
