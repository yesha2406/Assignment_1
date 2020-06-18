var jwt = require('jsonwebtoken');

var userSchemaModel = require('../schema/userSchema');

var Response = require('../response');

// Register new User.
exports.newUser = async function (req, res, next) {
    console.log(req.file);
    const userSchemaBodyData = {
        user_email: req.body.user_email,
        user_fname: req.body.user_fname,
        user_lname: req.body.user_lname,
        user_password: req.body.user_password,
    }
    try {
        let data = userSchemaModel(userSchemaBodyData);

        let newUser = await data.save();
        Response.successResponse('User Registered...!!', res, newUser, 200);

    }
    catch (error) {
        console.log(error);
        Response.errorResponse('User is not registered..!!', res, error, 500);
    }
};

// Display all users
exports.displayUsers = async function (req, res, next) {
    try {
        let allUsers = await userSchemaModel.find();
        Response.successResponse('Listing all Users...!!', res, allUsers, 200);
    }
    catch (error) {
        console.log(error);
        Response.errorResponse('There are no users..!!', res, error, 500);
    }
};

exports.loginUser = async function (req, res, next) {

    var user_email = req.body.user_email;
    var user_password = req.body.user_password;

    userSchemaModel.find({ user_email: user_email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                Response.errorResponse('Auth failed...!!', res, 404);
            }
            if (user_email == user[0].user_email && user_password == user[0].user_password) {
                const token = jwt.sign({
                    user_email: user[0].user_email,
                    user_fname: user[0].user_fname,
                    user_lname: user[0].user_lname
                },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });
                Response.successResponse('Auth successful...!!', res, user, 200, token);
            }
            else {
                Response.errorResponse('Auth failed...!!', res, 500);
            }
        })
        .catch(err => {
            console.log(err);
            Response.errorResponse('Auth failed...!!', res, err, 500);
        })

    // var user_email = req.body.user_email;
    // var user_password = req.body.user_password;
    // try {
    //     let login = await userSchemaModel.findOne({ 'user_email': user_email })
    //         .then((user) => {
    //             if (user) {
    //                 var db_user_email = user.user_email;
    //                 var db_user_password = user.user_password;
    //             }

    //             if (db_user_email == null) {
    //                 Response.errorResponse("Email is not Found...!!", res, error, 500);
    //             }
    //             else if (db_user_email == user_email && db_user_password == user_password) {
    //                 req.session.email = db_user_email;
    //                 Response.successResponse("Successful Login...!!", res, user, 200);
    //             }
    //             else {
    //                 Response.errorResponse("Invalid Login...!!", res, error, 500);
    //             }
    //         });
    // }
    // catch (error) {
    //     console.log(error);
    //     Response.errorResponse('Login Error', res, error, 500);
    // }
};
// exports.loginUser = async function (req, res, next) {
//     try {
//         var user_email = req.body.user_email;
//         var user_password = req.body.user_password;

//         let login = await userSchemaModel.findOne({ 'user_email': user_email }, function (error, user) {
//             if (user) {
//                 var db_user_email = user.user_email;
//                 var db_user_password = user.user_password;
//             }

//             if (db_user_email == null) {
//                 Response.errorResponse("Email is not Found...!!", res, error);
//             }
//             else if (db_user_email == user_email && db_user_password == user_password) {
//                 req.session.email = db_user_email;
//                 Response.successResponse("Successful Login...!!", res, login);
//             }
//             else {
//                 Response.errorResponse("Invalid Login...!!", res, error);
//             }
//         });
//     }
//     catch (error) {
//         console.log(error);
//         Response.errorResponse('Login Error', res, error);
//     }
// };