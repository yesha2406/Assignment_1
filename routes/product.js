var express = require('express');
var router = express.Router();

var productController = require('../controllers/product.controller');



/* API for Insert Product. */
router.post('/add-product-api', productController.newProduct);

/* API for Get all Products. */
router.get('/get-all-products-api', productController.displayProducts);

/* API for Sorting Price in Ascending order Product. */
router.get('/sortPriceByLowtoHigh-api', productController.ascPriceProducts);

/* API for Sorting Price in Descending order Product. */
router.get('/sortPriceByHightoLow-api', productController.desPriceProducts);

/* API for Sorting by Name in Ascending order Product. */
router.get('/sortName-asc-api', productController.ascNameProducts);

/* API for Sorting by Name in Descending order Product. */
router.get('/sortName-des-api', productController.desNameProducts);



module.exports = router;
