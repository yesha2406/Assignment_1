var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
});

var upload = multer({ storage: storage });

var userController = require('../controllers/user.controller');



// API for User Registration
router.post('/user-register-api', upload.single('user_image'), userController.newUser);

// API for get all the users.
router.get('/get-all-users-api', userController.displayUsers);

// Login for User.
router.post('/user-login-api', userController.loginUser);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home');
});

// GET Register Page.
router.get('/register', function (req, res, next) {
  res.render('register');
});

// GET Login Page.
router.get('/login', function (req, res, next) {
  res.render('login');
});

module.exports = router;