var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product_schema = new Schema({
    product_name: String,
    product_description: String,
    product_price: Number,
    product_color: String,
    product_size: String,
});

module.exports = mongoose.model(('product'), product_schema);