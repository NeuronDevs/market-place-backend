const express=require("express");
const app=express();
const errorMiddleware= require("./middlewares/errors")

app.use(express.json());

//Importar rutas
const productos=require("./routes/products")

app.use('/api', productos) // sujeto a decision (ruta del navegador)

//MiddleWare para manejar errores
app.use(errorMiddleware)

module.exports=app