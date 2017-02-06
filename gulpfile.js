var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');
var concat = require('gulp-concat');

var src = './src/';
var dist = './dist/';

var paths = {
    sass: src + './sass/*.scss',
    js: src + './js/*.js',
    json: src + './json/*.json',
    html: src + './*.html'
};

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

var autoprefixerOptions = {
    browers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('html', function() {
    gulp
        .src(paths.html)
        .pipe(concat("index.html"))
        .pipe(gulp.dest(dist));
});

gulp.task('js', function() {
    gulp
        .src(paths.js)
        .pipe(concat("script.js"))
        .pipe(gulp.dest(dist + './js'));
});

gulp.task('json', function() {
    gulp
        .src(paths.json)
        .pipe(concat("shopping-cart.json"))
        .pipe(gulp.dest(dist + './json'));
});

gulp.task('sass-compile', function(){
    gulp
        .src(paths.sass)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(concat("style.css"))
        .pipe(gulp.dest(dist + '/css'));
});

var sassdocOptions = {
    dest: src + 'doc/sass/'
};

gulp.task('watch', function(){
    gulp
        .watch(paths.sass, ['sass-compile'])
        .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    gulp
        .watch(paths.html, ['html'])
        .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    gulp
        .watch(paths.js, ['js'])
        .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    gulp
        .watch(paths.json, ['json'])
        .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['watch']);

// production task
gulp.task('prod', ['html', 'js', 'json'], function(){
    return gulp
        .src(paths.sass)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(concat("css/style.css"))
        .pipe(gulp.dest(dist));
});
