const producto=require("../models/productsModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
//const fetch =(url)=>import('node-fetch').then(({default:fetch})=>fetch(url));//Para usar fecth aquí cuando los modulos se instalan a través de require y no de import

//Ver la lista de productos
exports.getProducts = async (req, res, next) => {
    const products = await producto.find();
    res.status(200).json({
        success: true,
        message: "En esta ruta usted va a poder ver todos los productos",
        //cantidad:products.length,
        products
    })
}

//Ver un producto por ID
exports.getProductById = catchAsyncErrors( async (req, res, next) => { //catchAsyncErrors hace auditoria a los métodos
    const product = await producto.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Producto no encontrado", 404))
        } 
    

    res.status(200).json({
        success: true,
        message: "Aqui debajo encuentras información sobre tu producto: ",
        product
    })
})

//Crear un nuevo producto /api/admin_productos
exports.newProduct= catchAsyncErrors( async(req,res,next)=>{
    const product= await producto.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})

//Update un producto
exports.updateProduct = async (req, res, next) => {
    let product = await producto.findById(req.params.id) // Variable de tipo modificable

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "No encontramos ese producto"
        })
    }
    //Si el objeto si existia, entonces si ejecuto la actulización
    product = await producto.findByIdAndUpdate(req.params.id, req.body, {
        new: true, //Valido solo los atributos nuevos o actualizados
        runValidators: true
    });
    //Respondo Ok si el producto si se actualizó
    res.status(200).json({
        success: true,
        message: "Producto actualizado correctamente",
        product
    })
}

//Eliminar un producto
exports.deleteProduct = async (req, res, next) => {
    const products = await producto.findById(req.params.id);
    if (!products) { //Verifico que el objeto no existe para finalizar el proceso
        return res.status(404).json({ //Si el objeto no existe, return terminar el metodo
            success: false,
            message: "No encontramos ese producto"
        })
    }

    await products.remove(); //Elimino el producto
    res.status(200).json({
        success: true,
        message: "Producto eliminado correctamente",
    })
}





