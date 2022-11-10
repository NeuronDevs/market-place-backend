const express=require("express");
const app=express();
const errorMiddleware= require("./middlewares/errors")
const express = require("express");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
//Importar rutas
const productos = require("./routes/products");
const usuarios = require("./routes/auth");

app.use('/api', usuarios)
app.use('/api', productos) // sujeto a decision (ruta del navegador)

//MiddleWare para manejar errores
app.use(errorMiddleware)

module.exports = app
