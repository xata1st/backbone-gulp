'use strict';

var gulp = require('gulp'),
    //concat = require('gulp-concat'),
    rjs = require('gulp-requirejs-optimize'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    connect = require('gulp-connect'),
    opn = require('opn');

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        bootstrapFonts: 'build/fonts/bootstrap/'
    },
    src: {
        html: 'app/src/*.html',
        js: 'app/src/js/main.js',
        style: 'app/src/style/main.scss',
        img: 'app/src/img/**/*.*',
        fonts: 'app/src/fonts/**/*.*',
        bootstrapFonts: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*.*',
        rConfigFile: 'app/requireConfig.js'

    },
    watch: {
        html: 'app/src/**/*.html',
        js: 'app/src/js/**/*.js',
        style: 'app/src/style/**/*.scss',
        img: 'app/src/img/**/*.*',
        fonts: 'app/src/fonts/**/*.*'
    },
    clean: './build'
};

var server = {
    host: 'localhost',
    port: '9000'
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)                 //Pick up files by provided path
        .pipe(rigger())						//Run through rigger
		//.on('error',console.error.bind(console))
        .pipe(gulp.dest(path.build.html))   //Put up into build
		.on('error',console.error.bind(console))
        .pipe(connect.reload());            //Restart web server for a new version
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)                   //Find our main file
        .pipe(rigger())						//Run through rigger
        .pipe(sourcemaps.init())            //Initialize sourcemap
        //.pipe(uglify())                     //Zip our js
        .pipe(sourcemaps.write())           //Write down maps
        .pipe(gulp.dest(path.build.js))     //Put our file into build
        .pipe(connect.reload());            //Restart web server for a new version
});

gulp.task('js:require:build', function() {
    gulp.src(path.src.js)
        .pipe(rjs({
            mainConfigFile: path.src.rConfigFile
        }))
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload());
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)                //Pick up files by provided path
        .pipe(sourcemaps.init())            //Initialize sourcemap
        .pipe(sass())                       //Compile with SASS
        .pipe(prefixer())                   //Add vendor prefixes
        .pipe(cssmin())                     //Minify
        .pipe(sourcemaps.write())           //Write down maps
        .pipe(gulp.dest(path.build.css))    //Put up into build
        .pipe(connect.reload());            //Restart web server for a new version
});

gulp.task('style:build:!minify', function () {
    gulp.src(path.src.style)                //Pick up files by provided path
        .pipe(sourcemaps.init())            //Initialize sourcemap
        .pipe(sass())                       //Compile with SASS
        .pipe(prefixer())                   //Add vendor prefixes
        .pipe(sourcemaps.write())           //Write down maps
        .pipe(gulp.dest(path.build.css))    //Put up into build
        .pipe(connect.reload());            //Restart web server for a new version
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)                  //Zip our icons
        .pipe(imagemin({                    //Minify them
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))    //Put up into build
        .pipe(connect.reload());
});

gulp.task('custom:fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('bootstrap:fonts:build', function() {
    gulp.src(path.src.bootstrapFonts)
        .pipe(gulp.dest(path.build.bootstrapFonts));
});

gulp.task('fonts:build', [
    'custom:fonts:build',
    'bootstrap:fonts:build'
]);

gulp.task('build', [
    'html:build',
    'js:require:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('build:!cssmin', [
    'html:build',
    'js:build',
    'style:build:!minify',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function() {
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
        gulp.start('js:require:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build:!minify');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:require:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function() {
    connect.server({
        host: server.host,
        port: server.port,
        livereload: true
    });
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('openbrowser', function() {
    opn( 'http://' + server.host + ':' + server.port + '/build' );
});

gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);