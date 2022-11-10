const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());
//Importar rutas
const productos = require("./routes/products");
const usuarios = require("./routes/auth");

app.use('/api', usuarios)
app.use('/api', productos) // sujeto a decision (ruta del navegador)

module.exports = app