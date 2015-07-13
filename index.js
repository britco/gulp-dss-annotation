var dss = require('dss'),
    lodash = require('lodash'),
    gulpUtil = require('gulp-util'),
    through = require('through2');


module.exports = function (options) {
  'use strict';

  var key, value;

  if (typeof options === 'undefined') {
    options = {};
  }

  if (typeof options.detector !== 'undefined') {
    dss.detector(options.detector);
  }

  if (typeof options.parsers === 'undefined') {
    options.parsers = {};
  }

  for (key in options.parsers) {
    value = options.parsers[key];
    dss.parser(key, value);
  }

  return through.obj(function (file, enc, callback) {
    var onParse = function (result) {
      var mergedAnnotations;

      file.annotations = file.annotations || [];
      lodash.merge(file.annotations, result.blocks);

      // Provide injections into gulp-data
      file.data = file.data || {};
      file.data.annotations = file.data.annotations || [];
      lodash.merge(file.data.annotations, file.annotations);

      if (typeof options.postProcess !== 'undefined') {
        options.postProcess(file);
      }

      this.push(file);
      callback();
    };

    dss.parse(file.contents, {}, onParse.bind(this));
  });
};
