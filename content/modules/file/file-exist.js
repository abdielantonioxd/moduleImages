const {
  Router
} = require('express');
const del = new Router();
const path = require('path');
const fs = require('fs');

del.post('/delete/file', (req, res) => {
  var File = req.body.name;
  fs.unlink(path.join(__dirname, '../../public/images/') + File, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('File has been Deleted');
    }
  });
});
module.exports = del;