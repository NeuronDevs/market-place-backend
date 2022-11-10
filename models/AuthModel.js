const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor ingrese el nombre"],
        maxlength: [100, "Nombre no puede exceder los 100 caracteres"]
    },
    email: {
        type: String,
        required: [true, "Por favor ingrese el correo electronico"],
        unique: true,
        validate: [validator.isEmail, "Por favor ingrese un email valido"]
    },
    password: {
        type: String,
        required: [true, "Por favor registre una contraseña"],
        minlength: [8, "Tu contraseña debe tener al menos 8 caracteres"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})



//?Completado: Encriptamos contraseña antes de guardarla
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})



//?Completado: Decodificados contraseñas y comparamos
userSchema.methods.comparePass = async function (pass) {
    return await bcrypt.compare(pass, this.password)
}

//?Completado: Retornar un JWT token
userSchema.methods.getJWToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIEMPO_EXPIRACION
    })
}

// //Generar un token para reset de contraseña
// usuarioSchema.methods.genResetPasswordToken = function () {
//     const resetToken= crypto.randomBytes(20).toString('hex')

//     //Hashear y setear resetToken
//     this.resetPasswordToken= crypto.createHash("sha256").update(resetToken).digest('hex')

//     //Setear fecha de expiracion del token
//     this.resetPasswordExpire= Date.now() + 30*60*1000 //el token dura solo 30 min

//     return resetToken
// }

module.exports = mongoose.model("auth", userSchema)