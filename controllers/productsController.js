const producto=require("../models/productsModel")

//Ver la lista de productos
exports.getProducts=async(req,res,next) => {
    const productos=await producto.find();
    res.status(200).json({
       success:true,
       message: "En esta ruta usted va a poder ver todos los productos",
       //cantidad:productos.length,
       productos
    })
}

//Ver un producto por ID
exports.getProductById = async (req, res, next) => {
    const product = await producto.findById(req.params.id)

    if (!product) {
        return res.status(404).json({
            success:false,
            message: "No encontramos ese producto"
        })
    }

    res.status(200).json({
        success: true,
        message: "Aqui debajo encuentras información sobre tu producto: ",
        product
    })
}

//Update un producto
exports.updateProduct = async (req, res, next) => {
    let product = await producto.findById(req.params.id) // Variable de tipo modificable
    
    if (!product) {
            return res.status(404).json({
            success:false,
            message: "No encontramos ese producto"
        })
    }
    //Si el objeto si existia, entonces si ejecuto la actulización
    product= await producto.findByIdAndUpdate(req.params.id, req.body, {
        new:true, //Valido solo los atributos nuevos o actualizados
        runValidators:true
    });
    //Respondo Ok si el producto si se actualizó
    res.status(200).json({
        success:true,
        message:"Producto actualizado correctamente",
        product
    })
}

//Eliminar un producto
exports.deleteProduct=async(req,res,next) => {
    const productos=await producto.findById(req.params.id); 
    if (!product) { //Verifico que el objeto no existe para finalizar el proceso
            return res.status(404).json({ //Si el objeto no existe, return terminar el metodo
            success:false,
            message: "No encontramos ese producto"
        })
    }

    await product.remove(); //Elimino el producto
    res.status(200).json({
        success:true,
        message:"Producto eliminado correctamente",
    })
}




