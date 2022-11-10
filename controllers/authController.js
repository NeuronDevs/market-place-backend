const User = require("../models/authModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const crypto = require("crypto");
const sendToken = require("../utils/jsonWebToken");

//? Completado: Registrar un nuevo usuario /api/usuario/registro
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    console.log("name");

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp=CAU"
        }
    })
    sendToken(user, 201, res)
});


//? Completado: Iniciar Sesion - Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //revisar si los campos estan completos
    if (!email || !password) {
        return next(new ErrorHandler("Por favor ingrese email & Contraseña", 400))
    }

    //Buscar al usuario en nuestra base de datos
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Email o contraseña incorrectos", 401))
    }

    //Comparar contraseñas, verificar si está bien
    const passwordOk = await user.comparePass(password);

    if (!passwordOk) {
        return next(new ErrorHandler("Contraseña invalida", 401))
    }

    sendToken(user, 200, res)

});

//?Completado: Cerrar Sesion (logout)
exports.logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Cerró sesión"
    })
});


//?Completado: Ver perfil de usuario (Usuario que esta logueado)
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
});


//?Completado: Update perfil de usuario (logueado)
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    //?Completado: Actualizar el email por user a decisiòn de cada uno
    const newUserData = {
        nombre: req.body.nombre,
        email: req.body.email
    }

    //TODO: update Avatar

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    });
});


//?Complete: Servicios controladores sobre usuarios por parte de los ADMIN

//?Complete: Ver todos los usuarios
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

//?Complete: Ver el detalle de 1 usuario
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`No se ha encontrado ningun usuario con el id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    });
})

//?Complete: Actualizar perfil de usuario (como administrador)
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newData = {
        name: req.body.nombre,
        email: req.body.email,
        role: req.body.rol
    }

    const user = await User.findByIdAndUpdate(req.params.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    });
})

//?Complete: Eliminar usuario(como administrador)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`Usuario con id: ${req.params.id}
        no se encuentra en la base de datos`))
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "Usuario eliminado correctamente"
    })
})