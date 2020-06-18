var productSchemaModel = require('../schema/productSchema');
var Response = require('../response');

// Logic to add a product.
exports.newProduct = async function (req, res, next) {
    console.log(req.file);
    const productSchemaBodyData = {
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price,
        product_color: req.body.product_color,
        product_size: req.body.product_size
    }

    try {
        let data = productSchemaModel(productSchemaBodyData);

        let newProduct = await data.save();
        Response.successResponse("Product Added Successfuly..!!", res, newProduct, 201);
    }
    catch (error) {
        console.log(error);
        Response.errorResponse('Product is not added..!!', res, error, 500);
    }
};

// Logic to display all the products.
exports.displayProducts = async function (req, res, next) {
    try {
        let allProducts = await productSchemaModel.find();
        Response.successResponse('All the products..!!', res, allProducts, 200);
    }
    catch (error) {
        console.log(error);
        Response.errorResponse('Products are not listed due to an error..!!', res, error, 500);
    }
};

// Logic to sort price of products in Ascending Order
// exports.ascPriceProducts = async function (req, res, next) {
//     try {
//         let sortAscProducts = await productSchemaModel.find().sort({ product_price: 1 });
//         Response.successResponse("Low to High Price...!!", res, sortAscProducts, 200);
//     }
//     catch (error) {
//         console.log(error);
//         Response.errorResponse('Problem occured in sorting..!', res, error, 500);
//     }
// };

// Logic to sort price of products in Descending Order
// exports.desPriceProducts = async function (req, res, next) {
//     try {
//         let sortDesProducts = await productSchemaModel.find().sort({ product_price: -1 });
//         Response.successResponse("High to Low Price...!!", res, sortDesProducts, 200);
//     }
//     catch (error) {
//         console.log(error);
//         Response.errorResponse('Problem occured in sorting..!', res, error, 500)
//     }
// };

// Logic to sort Name of products in Ascending Order
// exports.ascNameProducts = async function (req, res, next) {
//     try {
//         let sortAscProducts = await productSchemaModel.find().sort({ product_name: 1 });
//         Response.successResponse("Products listed in ascending order..!", res, sortAscProducts, 200);
//     }
//     catch (error) {
//         console.log(error);
//         Response.errorResponse('Error', res, error, 500);
//     }
// };

// Logic to sort Name of products in Descending Order
// exports.desNameProducts = async function (req, res, next) {
//     try {
//         let sortDesProducts = await productSchemaModel.find().sort({ product_name: -1 });
//         Response.successResponse("Products listed in Descending order..!", res, sortDesProducts, 200);
//     }
//     catch (error) {
//         console.log(error);
//         Response.errorResponse('Error', res, error, 500);
//     }
// };

exports.sortByNameandPrice = async function (req, res, next) {
    try {
        var priceQuery = req.query.price;
        var nameQuery = req.query.name;

        if (priceQuery) {
            let sortProductsByPrice = await productSchemaModel.find().sort({ product_price: priceQuery });
            Response.successResponse('Sorted Products by Price...!!', res, sortProductsByPrice, 200);
        }

        if (nameQuery) {
            let sortProductsByName = await productSchemaModel.find().sort({ product_name: nameQuery });
            Response.successResponse('Sorted Products by Price...!!', res, sortProductsByName, 200);
        }
    }
    catch (error) {
        Response.errorResponse("Error in Sorting..!", res, error, 500);
    }
};