var dss = require('dss'),
    lodash = require('lodash'),
    gulpUtil = require('gulp-util'),
    through = require('through2'),

    PLUGIN_MODULE = 'gulp-dss-annotation';


function createError(message) {
  return new gulpUtil.PluginError(PLUGIN_MODULE, message);
}

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
