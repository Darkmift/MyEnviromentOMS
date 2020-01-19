const gulp = require('gulp');
const less = require('gulp-less');
var path = require('path');
const gulpautoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const watchPaths = { less: './less/**/*.less', html: './*.html', js: './js/*.js' };

function style() {
	// src:css src -> pipe:compile -> pipe:save to dest -> pipe:browserStream
	return (
		gulp
			.src(watchPaths.less)
			.pipe(less().on('error', handleError) /*.on('error', less.logError) */)
			// .pipe(gulpautoprefixer({ browsers: [ 'last 2 versions', '>5%' ] }))
			.pipe(gulp.dest('./css'))
			.pipe(browserSync.stream())
	);
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './',
		},
	});
	gulp.watch(watchPaths.less, style);
	gulp.watch(watchPaths.html).on('change', browserSync.reload);
	gulp.watch(watchPaths.js).on('change', browserSync.reload);
}

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

exports.style = style;
exports.watch = watch;
