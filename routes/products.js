const express=require("express")
const router=express.Router();

const {getProducts, 
    newProduct, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/productsController"); //Traemos la respuesta json desde el controlador
const { isAuthenticatedUser , authorizeRoles} = require("../middlewares/authMiddleware");

router.route('/admin_productos').get(getProducts) // Establecemos desde que ruta queremos ver el getProducts
router.route('/admin_productos/nuevo').post(isAuthenticatedUser, authorizeRoles("admin"), newProduct) // Establecemos desde que ruta queremos ver el newProduct
router.route('/admin_productos/:id').get(getProductById) // Establecemos desde que ruta queremos ver el getProductById
router.route('/admin_productos/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct) // Creación de la ruta de actualización
router.route('/admin_productos/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct) // Creación de la ruta de eliminación por Id

module.exports=router;