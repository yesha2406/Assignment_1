var userSchemaModel = require('../schema/userSchema');

var Response = require('../response');

// Register new User.
exports.newUser = async function (req, res, next) {
    const userSchemaBodyData = {
        user_email: req.body.user_email,
        user_fname: req.body.user_fname,
        user_lname: req.body.user_lname,
        user_password: req.body.user_password
    }

    try {
        let data = userSchemaModel(userSchemaBodyData);

        let newUser = await data.save();
        Response.successResponse('User Registered...!!', res, newUser);
    }
    catch (error) {
        console.log(error);
        Response.errorResponse('User is not registered..!!', res, error);
    }
};

// Display all users
exports.displayUsers = async function (req, res, next) {
    try {
        let allUsers = await userSchemaModel.find();
        Response.successResponse('Listing all Users...!!', res, allUsers);
    }
    catch (error) {
        console.log(error);
        Response.errorResponse('There are no users..!!', res, error);
    }
};

exports.loginUser = async function (req, res, next) {
    try {
        var user_email = req.body.user_email;
        var user_password = req.body.user_password;

        let login = await userSchemaModel.findOne({ 'user_email': user_email }, function (error, user) {
            if (user) {
                var db_user_email = user.user_email;
                var db_user_password = user.user_password;
            }

            if (db_user_email == null) {
                Response.errorResponse("Email is not Found...!!", res, error);
            }
            else if (db_user_email == user_email && db_user_password == user_password) {
                req.session.email = db_user_email;
                Response.successResponse("Successful Login...!!", res, login);
            }
            else {
                Response.errorResponse("Invalid Login...!!", res, error);
            }
        });
    }
    catch (error) {
        console.log(error);
        Response.errorResponse('Login Error', res, error);
    }
};
