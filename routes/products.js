const express = require("express")
const router = express.Router();

const { getProducts,
    newProduct,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productsController"); //Traemos la respuesta json desde el controlador
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/authMiddleware");

router.route('/productos').get(getProducts) // Establecemos desde que ruta queremos ver el getProducts
router.route('/productos/nuevo').post(isAuthenticatedUser, authorizeRoles("admin"), newProduct) // Establecemos desde que ruta queremos ver el newProduct
router.route('/producto/:id').get(getProductById) // Establecemos desde que ruta queremos ver el getProductById
router.route('/producto/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct) // Creación de la ruta de actualización
router.route('/producto/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct) // Creación de la ruta de eliminación por Id

module.exports = router;