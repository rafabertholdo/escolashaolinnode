var gulp = require('gulp');
var ts = require('gulp-typescript');
//var typescript = require('gulp-tsc');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', function() {
    var tsResult = gulp.src('src/**/*.ts')
//        .pipe(typescript())
//        .pipe(gulp.dest('built/local')); 
        .pipe(ts({
            typescript: require('typescript')
                        
        }));

    return tsResult.js.pipe(gulp.dest('built/local'));
});

gulp.task('watch', ['build'], function() {
    gulp.watch('src/**/*.ts', ['build']);
});