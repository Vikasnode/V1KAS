var express = require('express');
var router = express.Router();
var product = require("./product");
const {
  ObjectId
} = require('mongodb');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var flash = require('connect-flash'); 
var session = require('express-session');
const { config } = require('dotenv');
require('dotenv').config();

router.use(flash());

router.use(session({ 
  secret:'geeksforgeeks', 
  saveUninitialized: true, 
  resave: true
}));

router.get('/loging',function(req,res){
  res.render('loging');
});

router.post('/register',function(req,res,next){
  let username = req.body.username;
  let password = req.body.password;

console.log(username,password);

try {
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Verify user credentials here
      if (username === 'user' && password === 'password') {
        return done(null, { id: 1, username: 'user' });
      } else {
        return done(null, false, { message: 'Invalid credentials' });
      }
    })
  );
} catch (error) {
  console.log(`Ye dikkat hai ${error}`);
}

next()

})




/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(process.env.NODE_ENV);
  res.render('index', {
    title: 'Express',
    product: 'Add New Product'
  });
});


router.get('/collection', async function (req, res, next) {
  let db = await product();
  let productFind = await db.find().toArray();
  // console.log(productFind);
  // let db = product.find
  res.render("products", {
    product: productFind
  });
  // res.send(productFind[0]._id);
});

router.get('/products/:_id', async function (req, res, next) {
  var product_id = req.params._id
  // console.log(url)
  var db = await product();

  try {

    var productFind = await db.findOne({_id: new ObjectId(`${product_id}`)}, (err, user) => {
      if (err) {
        console.error('Error finding user:', err);
        return;
      }

      if (user) {
        console.log('Found user:', user);
      } else {
        console.log('User not found');
      }
      // Close the connection
      client.close();

    });;

  } catch (error) {
    console.log(error)
  }
  // console.log(productFind);
  res.render("pdp-page", {
    productname: productFind
  });
  next()
})

router.post('/submit', async function (req, res) {
  let productName = req.body.product;
  let mrp = req.body.mrp;
  // let image = req.body.image; 
  // console.log(req.file)
  // console.log(pd, mrp)

  let db = await product();
  let inset = await db.insertOne({
    produc: `${productName}`,
    mrp: `${mrp}`,
  })
  res.redirect('/');

});
router.delete('/delete/:id',async (req,res) => {
  const productId = req.params.id;
  console.log(productId)
  let db = await product();
  try {
   let deleteProduct =await db.deleteOne( { _id: new ObjectId(`${productId}`) } );
 } catch (error) {
    console.log(error);
 }
  res.redirect("/collection")
  });
  
 

  router.get('/pdp', (req, res) => { 
let user = {
  name:"vikas",
}
    req.flash('message', `${user}`);
    res.send(user)
  }); 
    
  router.get('/check',async (req, res) => { 
    let x =await req.flash('message');
      req.send(x); 
   console.log(x);
  });
    

module.exports = router;