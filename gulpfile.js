var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var preprocess = require('gulp-preprocess');
var ghPages = require('gulp-gh-pages');

//Profiles
gulp.task('default', ['clean:pre', 'watch', 'react', 'less', 'server']);

gulp.task('deploy', ['ghpages']);

//Tasks
gulp.task('server', ['preprocess:dev'], function() {
	nodemon({
		script: 'app.js',
		ext: 'js html',
		env: { 'NODE_ENV': 'development' }
	});
});

gulp.task('react', function() {
  var b = browserify();
  b.transform(reactify);
  b.add('./main.js');
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('less', function() {
 return gulp.src('./less/**/main.less')
    .pipe(less())
    .pipe(gulp.dest('./dist'));
});

gulp.task('compress', ['react'], function() {
	return gulp.src('dist/main.js')
		.pipe(uglify({compress: {
            negate_iife: false
        }}))
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('dist')); //overwrite file
});

gulp.task('mincss', ['less'], function() {
	return gulp.src('dist/main.css')
		.pipe(cssmin())
		.pipe(rename('app.min.css'))
		.pipe(gulp.dest('dist')); //overwrite file
});

gulp.task('clean:pre', function() {
	return gulp.src('dist/**/**.**', { read: false})
		.pipe(clean());
});

gulp.task('clean:post', ['compress', 'mincss'], function() {
	return gulp.src('dist/main.**', {read: false})
		.pipe(clean())
		.pipe(gulp.dest('dist'));
});

gulp.task('preprocess:dev', function() {
	return gulp.src('index.html')
		.pipe(preprocess({context: { DEBUG: true}}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('preprocess:prod', function() {
	return gulp.src('index.html')
		.pipe(preprocess())
		.pipe(gulp.dest('./dist/'));
});

gulp.task('ghpages', ['clean:pre', 'clean:post', 'preprocess:prod'], function() {
	return gulp.src('./dist/**/*')
		.pipe(ghPages({
			message: 'Deploy to gh-pages [timestamp]'
		}));
});

gulp.task('watch', function() {
  gulp.watch('./less/**/**.less', ['less']);
  gulp.watch('./js/**/**.js', ['react']);
  gulp.watch('./js/**/**.jsx', ['react']);
});