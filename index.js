'use strict';

var Busboy = require('busboy');

module.exports = function (req, options) {
  return new Promise(function (resolve, reject) {
    var busboy = new Busboy(Object.assign({ headers: req.headers }, options));
    var parts = {
      fields: {},
      files: {}
    };

    busboy.on('field', function (name, value, isNameTruncated, isValueTruncated, encoding, mimeType) {
      parts.fields[name] = {
        value: value,
        isNameTruncated: isNameTruncated,
        isValueTruncated: isValueTruncated,
        encoding: encoding,
        mimeType: mimeType
      };
    });

    busboy.on('file', function (name, file, filename, encoding, mimeType) {
      parts.files[name] = {
        file: file,
        filename: filename,
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
