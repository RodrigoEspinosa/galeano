'use strict';

const Path = require('path');

// Local require for script function helper.
module.exports.requireLocal = function(script) {
  return require(Path.join(SCRIPTS_DIR, script));
};
