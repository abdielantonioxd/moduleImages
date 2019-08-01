const {
  Router
} = require('express');
const router = new Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/images'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})
const uploadImage = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024
  }
}).any('image',10);

router.post('/images/upload', (req, res) => {
  uploadImage(req, res, (err) => {
    if (err) {
      err.message = 'The file is so heavy for my service';
      return res.send(err);
    }
    console.log(req.files);
  });
});
module.exports = router;