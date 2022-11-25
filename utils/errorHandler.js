//Manejador de errores
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
        this.msj = message

        Error.captureStackTrace(this, this.constructor)//Genera una trazabilidad del error
    }
}

module.exports = ErrorHandler