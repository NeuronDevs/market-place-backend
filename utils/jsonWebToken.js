//Crear y enviar un token guarado en una cookie
const sendToken = (user, statusCode, res) => {

    //?Completado: Creamos el token
    const token = user.getJWToken();

    //?Completado: Opciones del token
    const Options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    //?Completado
    res.status(statusCode).cookie("token", token, Opciones).json({
        success: true,
        token,
        user
    });
}

module.exports = sendToken;