const {
  Router
} = require('express');
const router = new Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
// var bodyParser = require('body-parser')
// router.use(bodyParser.urlencoded({'extended':'true'})); 
// router.use(bodyParser.json({ type: '*/*' }));

router.get('/images/upload', (req, res) => {
  res.render('index');
});

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/images'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const uploadImage = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024,
  }
}).single('image');

router.post('/images/upload', (req, res) => {
  uploadImage(req, res, (err) => {
    if (err) {
      err.message = 'The file is so heavy for my service';
      return res.send(err);
    }else{
      console.log(req.body)
    }
  });
 
});

// router.post('/file/user', (req, res) => {
//   console.log(req.body.name)
// })

module.exports = router;