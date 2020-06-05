var express = require('express');
var router = express.Router();

var Response = require('../response');

var userSchemaModel = require('../schema/userSchema');

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

// API for User Registration
router.post('/user-register-api', function (req, res) {
  const userSchemaBodyData = {
    user_email: req.body.user_email,
    user_fname: req.body.user_fname,
    user_lname: req.body.user_lname,
    user_password: req.body.user_password
  }

  let data = userSchemaModel(userSchemaBodyData);

  data.save(function (err) {
    if (err)
      Response.errorResponse(err, res);
    else
      Response.successResponse('User is Registered now..!!', res, {});
  });
});

// API for get all the users.
router.get('/get-all-users-api', function (req, res) {
  userSchemaModel.find(function (err, user) {
    if (err)
      Response.errorResponse(err, res);
    else
      res.json(user);
  });
});

router.post('/user-login-api', function (req, res) {
  var user_email = req.body.user_email;
  var user_password = req.body.user_password;

  userSchemaModel.findOne({ 'user_email': user_email }, function (err, user) {
    if (user) {
      var db_user_email = user.user_email;
      var db_user_password = user.user_password;
    }

    if (db_user_email == null) {
      Response.errorResponse("Email is not Found...!!", err, res);
    }
    else if (db_user_email == user_email && db_user_password == user_password) {
      req.session.email = db_user_email;
      Response.successResponse("Successful Login...!!", res, user);
    }
    else {
      Response.errorResponse(err, res, "Invalid Login...!!");
    }
  });
});

module.exports = router;
