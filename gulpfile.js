var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', function() {
    var tsResult = gulp.src('src/**/*.ts') 
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('built/local'));
});

gulp.task('watch', ['build'], function() {
    gulp.watch('src/**/*.ts', ['build']);
});