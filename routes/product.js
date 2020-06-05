var express = require('express');
var router = express.Router();

var Response = require('../response');

var productSchemaModel = require('../schema/productSchema');

// API for Insert Product.
router.post('/add-product-api', function (req, res) {
    const productSchemaBodyData = {
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price,
        product_color: req.body.product_color,
        product_size: req.body.product_size
    }

    let data = productSchemaModel(productSchemaBodyData);

    data.save(function (err) {
        if (err)
            Response.errorResponse(err, res);
        else
            Response.successResponse('Product is added..!!', res, {});
    });
});

// API for Get all Products.
router.get('/get-all-products-api', function (req, res) {
    productSchemaModel.find(function (err, product) {
        if (err)
            Response.errorResponse(err, res);
        else
            res.json(product);
    });
});

// API for Sorting Price in Ascending order Product.
router.get('/sortPriceByLowtoHigh-api', function (req, res) {
    productSchemaModel.find()
        .sort({ product_price: 1 })
        .then(products => {
            return res.json(products);
        });
});

// API for Sorting Price in Descending order Product.
router.get('/sortPriceByHightoLow-api', function (req, res) {
    productSchemaModel.find()
        .sort({ product_price: -1 })
        .then(products => {
            return res.json(products);
        });
});

// API for Sorting by Name in Ascending order Product.
router.get('/sortName-asc-api', function (req, res) {
    productSchemaModel.find()
        .sort({ product_name: 1 })
        .then(products => {
            return res.json(products);
        });
});

// API for Sorting by Name in Descending order Product.
router.get('/sortName-des-api', function (req, res) {
    productSchemaModel.find()
        .sort({ product_name: -1 })
        .then(products => {
            return res.json(products);
        });
});
// API for Insert Product.

module.exports = router;