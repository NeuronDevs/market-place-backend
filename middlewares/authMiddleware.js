const User = require("../models/authModel")
const jwt = require("jsonwebtoken")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("./catchAsyncErrors")

//Verificamos si estamos autenticados, (existencia y veracidad del token)
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Debe iniciar sesion para acceder a este recurso", 401))
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()

})

//Capturamos role
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Rol (${req.user.role}) no esta autorizado a entrar a esta area`, 403))
        }
        next()
    }
}