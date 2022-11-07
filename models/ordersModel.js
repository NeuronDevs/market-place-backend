const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    orderInfo: {
        direction: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        deparment: {
            type: String,
            required: true
        }
    }
    // ,
    // user:
    // {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "auth"
    // }
    ,
    items: [{
        name: {
            type: String,
            required: true
        },
        cant: {
            type: Number,
            required: true
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
        price: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "products"
        }
    }
    ],
    paymentInfo: {
        id: {
            type: String
        },
        state: {
            type: String
        }
    },
    dateInfo: {
        type: Date
    },

    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        defautl: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    state: {
        type: String,
        required: true,
        default: "Procesando"
    },
    shippingDate: {
        type: Date
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("order", orderSchema)