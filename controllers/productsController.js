const producto=require("../models/productsModel")

//Ver la lista de productos
exports.getProducts=(req,res,next) => {
    res.status(200).json({
       success:true,
       message: "En esta ruta usted va a poder ver todos los productos"
    })
}

