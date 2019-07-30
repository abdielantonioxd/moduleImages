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
    fileSize: 1000000
  }
}).single('image');

router.post('/images/upload', (req, res) => {
  uploadImage(req, res, (err) => {
    if (err) {
      err.message = 'The file is so heavy for my service';
      return res.send(err);
    }
    console.log(req.file);
  });
});
module.exports = router;