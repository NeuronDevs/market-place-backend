const mongoose = require("mongoose");

const productsScheme = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor registra el nombre del producto."],
        trim: true,
        maxLength: [120, "El nombre del producto no debe exceder los 120 caracteres."]
    },
    price: {
        type: Number,
        required: [true, "Por favor registre el precio del producto."],
        maxLength: [8, "El precio del producto no puede estar por encima de 99'999.999"],
        default: 0.0 //reconoce que es un float
    },
    description: {
        type: String,
        required: [true, "Por favor registre una descripcion para el producto."]
    },
    stock: {
        type: Number,
        required: [true, "Por favor registre el precio del producto."],
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
})

module.exports = mongoose.model('products', productsScheme)