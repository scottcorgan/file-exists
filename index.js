var fs = require('fs');
var path = require('path');

module.exports = function (filepath, options) {
  options = options || {};
  
  var root  = options.root || './';
  var fullpath = path.join(root, filepath);
  
  if (!fs.existsSync(fullpath)) return false;
  if (!fs.statSync(fullpath).isFile()) return false;
  
  return true;
};