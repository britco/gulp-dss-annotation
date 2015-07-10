var dss = require('dss'),
    lodash = require('lodash'),
    gulpUtil = require('gulp-util'),
    through = require('through2');


module.exports = function (options) {
  'use strict';

  return through.obj(function (file, enc, callback) {
    var onParse = function (result) {
      var mergedAnnotations;

      file.annotations = file.annotations || {};

      // NOTE: This may be dangerous for some advanced use-cases, so we may
      // want to reconsider other options for formatting this at a later time.
      mergedAnnotations = lodash.merge.apply(this, [
        file.annotations,
      ].concat(result.blocks));

      this.push(file);
      callback();
    };

    dss.parse(file.contents, {}, onParse.bind(this));
  });
};
