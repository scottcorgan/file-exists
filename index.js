var fs = require('fs')
var path = require('path')

module.exports = function (filepath, options) {
  options = options || {}

  if (!filepath) return false

  var root = options.root
  var fullpath = (root) ? path.join(root, filepath) : filepath

  try {
    return fs.statSync(fullpath).isFile();
  }
  catch (e) {
    
    if (e.code == 'ENOENT') // no such file or directory 
      return false;
    
    // something else went wrong, we don't have rights, ...
    throw e;
  }
}
