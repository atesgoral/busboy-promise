'use strict';

var Busboy = require('busboy');

module.exports = function (req, options) {
  return new Promise(function (resolve, reject) {
    var busboy = new Busboy(Object.assign({ headers: req.headers }, options));
    var parts = {
      fields: {},
      files: {}
    };

    busboy.on('field', function (name, value, encoding, mimeType) {
      parts.fields[name] = {
        value: value,
        encoding: encoding,
        mimeType: mimeType
      };
    });

    busboy.on('file', function (name, file, encoding, mimeType) {
      parts.files[name] = {
        file: file,
        encoding: encoding,
        mimeType: mimeType
      };
    });

    busboy.on('finish', function () {
      resolve(parts);
    });

    req.pipe(busboy);
  });
};
