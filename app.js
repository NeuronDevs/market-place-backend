const express=require("express");
const app = express();
const errorMiddleware= require("./middlewares/errors")
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

//Importar rutas
const productos = require("./routes/products");
const usuarios = require("./routes/auth");
const ordenes=require("./routes/orders")

app.use('/api', usuarios)
app.use('/api', productos) // sujeto a decision (ruta del navegador)
app.use('/api', ordenes)

//MiddleWare para manejar errores
app.use(errorMiddleware)

module.exports = app
