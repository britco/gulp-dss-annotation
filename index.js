var dss = require('dss'),
    lodash = require('lodash'),
    gulpUtil = require('gulp-util'),
    through = require('through2');


module.exports = function (options) {
  'use strict';

  return through.obj(function (file, enc, callback) {
    var onParse = (function (result) {
      file.annotations = file.annotations || [];
      lodash.merge(file.annotations, result.blocks);
      this.push(file);
      callback();
    });

    dss.parse(file.contents, {}, onParse.bind(this));
  });
};
