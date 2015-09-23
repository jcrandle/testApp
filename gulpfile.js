(function() {
    'usei strict';
    var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    war = require('gulp-war'),
    zip = require('gulp-zip'),
    _paths = ['server/**/*.js', 'client/js/*.js', 'server/views/*.html'];

    //register nodemon task
    gulp.task('nodemon', function() {
        nodemon({
            script: 'server/app.js',
            env: {
                'NODE_ENV': 'development'
            }
        })
        .on('restart');
    });

    // Rerun the task when a file changes
    gulp.task('watch', function() {
        livereload.listen();
        gulp.src(_paths, {
            read: false
        })
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(plumber.stop());
        watch(_paths, livereload.changed);
    });

    //lint js files
    gulp.task('lint', function() {
        gulp.src(_paths)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
    });

    gulp.task('war', function () {
        gulp.src(["*.js", "*.md", "test/*.js"])
        .pipe(war({
            welcome: 'index.html',
            displayName: 'Grunt WAR',
        }))
        .pipe(zip('myApp.war'))
        .pipe(gulp.dest("./dist"));
    });

    // The default task (called when you run `gulp` from cli)
    // gulp.task('default', ['lint', 'nodemon', 'watch']); // TODO: restrict lint to our code
    gulp.task('default', ['nodemon', 'watch']);
}());

