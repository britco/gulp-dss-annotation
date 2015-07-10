# gulp-dss-annotation

Annotate files in Gulp streams with DSS.

## Usage

A gulpfile may compile all scss files like so:

```javascript
var gulp = require('gulp'),
    dssAnnotation = require('gulp-dss-annotation'),
    sass = require('gulp-sass');


gulp.task('default', function () {
  gulp.src('src/*.scss')
    .pipe(dssAnnotation())
    .pipe(sass())
    .pipe(gulp.dest('public'));
});
```

All `file` arguments passed into plugins after `dssAnnotation` would have a
list attached to them called `annotation`. This will be a list of annotation
data from DSS.
