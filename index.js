const fs = require('fs')
const path = require('path')

function fileExits (filepath, options, done = function () {}) {
  if (typeof options === 'function') {
    done = options
    options = {}
  }

  fs.stat(fullPath(filepath, options), (err, stats) => {
    if (err) {
      return done(err)
    }

    done(null, stats.isFile())
  })
}

fileExits.sync = function fileExistsSync (filepath = '', options = {}) {
  try {
    return fs.statSync(fullPath(filepath, options)).isFile()
  }
  catch (e) {
    // Check exception. If ENOENT - no such file or directory ok, file doesn't exist.
    // Otherwise something else went wrong, we don't have rights to access the file, ...
    if (e.code != 'ENOENT') {
      throw e
    }

    return false
  }
}

function fullPath (filepath, options = {}) {
  const root = options.root
  return (root) ? path.join(root, filepath) : filepath
}

module.exports = fileExits
