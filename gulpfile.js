var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

//Profiles
gulp.task('default', ['react','server']);

//Tasks
gulp.task('server', function() {
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
    .pipe(source('./main.js'))
    .pipe(watch('./main.js'))
    .pipe(gulp.dest('./dist'));
});