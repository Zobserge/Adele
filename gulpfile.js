'use strict';

// Подключение пакетов
var gulp =  require('gulp');
var del = require('del');
var sass =  require('gulp-sass');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();



// SCCSS > CSS
function style() {
	return gulp.src('./src/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
            cascade: false
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream());
}


// JS
function scripts() {
	return gulp.src('./src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}


// IMG
function image() {
	return gulp.src('./src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./build/img'))
}


// FONT
function font() {
	return gulp.src('./src/fonts/*')
		.pipe(gulp.dest('./build/fonts'))
}


// CLEAN
function clean() {
	return del(['./build/*'])
}


// WATCH
function watch() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
	gulp.watch('./src/scss/*scss', style);
	gulp.watch('./src/js/script.js', scripts);
	gulp.watch('./*.html').on('change', browserSync.reload);
}

gulp.task('style', style);
gulp.task('scripts', scripts);
gulp.task('image', image);
gulp.task('font', font);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(style, scripts, font, image)));

gulp.task('default', gulp.series('build', 'watch'));


