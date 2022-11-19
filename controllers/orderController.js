const Order=require("../models/ordersModel");
const Product= require("../models/productsModel")
const catchAsyncErrors= require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const ordersModel = require("../models/ordersModel");

//Crear una nueva orden
exports.newOrder= catchAsyncErrors (async (req, res, next)=>{
    const {
        items,
        orderInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order= await Order.create ({
        items,
        orderInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        dateInfo: Date.now(),
        user: req.user._id
    })
    items.forEach((x)=>{
        updateStock(x.product,x.cant*-1);
    });

    res.status(201).json({
        success:true,
        order
    })
})

//Ver una orden
exports.getOneOrder= catchAsyncErrors(async(req, res, next)=>{
    const order= await Order.findById(req.params.id).populate("user", "email") //restriccion de usuario

    if(!order){
        return next(new ErrorHandler("No encontramos una orden con ese Id",404))
    }

    res.status(200).json({
        success:true,
        order
    })
})

//Ver todas mis ordenes (usuario logueado)
exports.myOrders= catchAsyncErrors(async(req,res, next)=>{
    const orders= await Order.find({user: req.user._id});

    res.status(200).json({
        success:true,
        orders
    })
})

//Admin
//Ver todas la ordenes (Administrador)
exports.allOrders= catchAsyncErrors(async (req, res, next)=>{
    const orders= await Order.find()

    let cantidadTotal= 0;
    orders.forEach(order =>{
        cantidadTotal= cantidadTotal + order.totalPrice
       // es acumulativo
    })

    res.status(200).json({
        success:true,
        cantidadTotal,
        orders
    })

})

//Editar una orden (admin) 
exports.updateOrder= catchAsyncErrors(async(req, res, next)=>{
    const order= await Order.findById(req.params.id)

    if(!order){
        return next (new ErrorHandler("Orden no encontrada", 404))
    }

    if (order.estado==="Enviado"){
        return next(new ErrorHandler("Esta orden ya fue enviada", 400))
    }

    order.state = req.body.state;
    order.shippingDate= Date.now();

    await order.save()

    res.status(200).json({
        success:true,
        order
    })
})

//Para actualizar el stock segun las ventas efectivas
async function updateStock(id, quantity){
    const product = await Product.findById(id);
    product.stock= product.stock+quantity;
    await product.save({validateBeforeSave: false})
}

//Eliminar una orden (admin)
exports.deleteOrder = catchAsyncErrors(async (req, res, next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next (new ErrorHandler("Esa orden no esta registrada", 404))
    }
    await order.remove()

    res.status(200).json({
        success:true,
        message:"Orden eliminada correctamente"
    })
})