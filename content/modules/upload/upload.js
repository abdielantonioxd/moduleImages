const {
  Router
} = require('express');
const router = new Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const upload = require('./uploadMiddleware');
const Resize = require('./resize');
// const storage = multer.diskStorage({
//   destination: path.join(__dirname, '../../public/images'),
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// })
// const uploadImage = multer({
//   storage,
//   limits: {
//     fileSize: 1024 * 1024
//   }
// }).any('image',10);
// router.post('/images/upload', (req, res) => {
//   uploadImage(req, res, (err) => {
//     if (err) {
//       err.message = 'The file is so heavy for my service';
//       return res.send(err);
//     }
//     console.log(req.files)
//   });
// });


router.post('/post', upload.single('image'), async function (req, res) {
  const imagePath = path.join(__dirname, '/public/images');
  const fileUpload = new Resize(imagePath);
  const filename = await fileUpload.save(req.file.buffer);
  return res.status(200).json({ name: filename });
});


module.exports = router;