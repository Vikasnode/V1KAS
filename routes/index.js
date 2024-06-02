require('dotenv').config()
var express = require('express');
var router = express.Router();
var db = require('./product');
const multer = require('multer')


/* GET home page. */
router.get('/', async function (req, res, next) {
  let product = await db.find({});
  res.render('index', { product: product });
})

  ;
router.get('/admin', function (req, res, next) {
  res.render('admin');
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage });

router.post('/create', upload.single('img'), function (req, res, next) {
  let productName = req.body.name;
  let productMrp = req.body.mrp;
  let productDscr = req.body.description;
  let productimg = req.file;
  // console.log(productimg.path);
  db.create({
    name: `${productName}`
    , mrp: `${productMrp}`
    , description: `${productDscr}`,
    img: `${productimg.filename}`
  })
  res.redirect('/admin');
})

router.get('/collection', async function (req, res) {
  let product = await db.find({});
  res.render('collection', { product: product })
});

router.get('/product/:_id', async function (req, res) {
  let _id = req.params._id;
  let product = await db.findById({ _id: `${_id}` });
  res.render('product', { product: product })
});


router.delete('/delete/:_id', async function (req, res) {
  let _id = req.params._id;
  let product = await db.findById({ _id: `${_id}` });
  let deletepdp = await db.deleteOne({ name: `${product.name}` });

})

module.exports = router;
