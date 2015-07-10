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

All `file` arguments passed into plugins after `dssAnnotation` would have an
object attached to them called `annotations`. This object will contain all
annotations from DSS, merged into a single object. This will also merge any
annotations into a "annotations" variable in [gulp-data][gd].


[gd]: https://github.com/colynb/gulp-data "gulp-data"
