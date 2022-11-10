const mongoose = require("mongoose");

const productsScheme = mongoose.Schema({
    id: String,
    name: String,
    stock: String,
    description: String,
    price: String,
    image: String
})

module.exports = mongoose.model('products', productsScheme)