# busboy-promise

Promisified multipart collection using [Busboy](https://github.com/mscdex/busboy)

## Usage

```sh
npm install busboy-promise
```

Assume `req` is a request object. `options` is an optional object to pass additional options to Busboy.

```js
var busboyPromise = require('busboy-promise');

busboyPromise(req, options)
  .then(function (parts) {
    for (var name in parts.fields) {
      var field = parts.fields[name];
      console.log('field name:', field.value, 'value:', field.value);
    }

    for (var name in parts.files) {
      var file = parts.files[name];
      console.log('file field name:', file.value);
    }
  });

```

`parts` is an object with two properties:

**fields:** A hashmap of fields. Property names are the field names. Values are objects with the original Busboy event arguments:

```js
{
  value: /* the value */,
  isNameTruncated: /* whether the name is truncated */,
  isValueTruncated: /* whether the value is truncated */,
  encoding: /* the encoding */,
  mimeType: /* the MIME type */
}
```

**files:** A hashmap of files. Property names are the field names. Values are object with the original Busboy event arguments:

```js
{
  file: /* the file stream */,
  filename: /* the original filename */,
  encoding: /* the encoding */,
  mimeType: /* the MIME type */
}
```
