const {
  Router
} = require('express');
const router = new Router();
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
// configuration multer 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './content/public/images')
  },
  filename: function (req, file, cb) {
    cb(null, 'tmp_' + file.originalname)
  }
});
var upload = multer({
  storage: storage
}).single('image')

let width = 600;
// let height = 600;

router.post('/upload', upload, function (req, res, next) {
  sharp(req.file.path)
    .resize(width)
    .toFile('./content/public/images/' + req.file.originalname, function (err) {
      if (!err) {
        deleteLargeImage()
      } else {
        console.log(err)
      }
    })

  function deleteLargeImage() {
    fs.unlink(path.join(__dirname, '../../public/images/tmp_') + req.file.originalname, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log('File has been Deleted');
      }
    });
  }
  
})

module.exports = router;