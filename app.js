const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors")
const cookieParser = require('cookie-parser');
const cors = require('cors');


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//Importar rutas
const productos = require("./routes/products");
const usuarios = require("./routes/auth");
const ordenes = require("./routes/orders")

app.use('/api', usuarios)
app.use('/api', productos) // sujeto a decision (ruta del navegador)
app.use('/api', ordenes)

//MiddleWare para manejar errores
app.use(errorMiddleware)

module.exports = app
