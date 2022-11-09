const express=require("express")
const router=express.Router();

const {getProducts, getProductById, updateProduct, deleteProduct} = require("..//controllers/productsController") //Traemos la respuesta json desde el controlador

router.route('/admin_productos').get(getProducts) // Establecemos desde que ruta queremos ver el getProducts
router.route('/admin_productos/:id').get(getProductById) // Establecemos desde que ruta queremos ver el getProductById
router.route('/admin_productos/:id').put(updateProduct) // Creación de la ruta de actualización
router.route('/admin_productos/:id').delete(deleteProduct) // Creación de la ruta de eliminación por Id

module.exports=router;