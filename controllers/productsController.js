const producto = require("../models/productsModel")

//Ver la lista de productos
exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "En esta ruta usted va a poder ver todos los productos"
    })
}

exports.getProductById = (req, res, next) => {
    // const product = await producto.findById(req.params.id)

    // if (!product) {
    //     return next(new ErrorHandler("Producto no encontrado", 404))
    // }

    res.status(200).json({
        success: true,
        message: "Aqui debajo encuentras información sobre tu producto: "
    })
}