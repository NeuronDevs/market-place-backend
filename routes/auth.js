const express = require("express");
const { registerUser,
    loginUser,
    logOut,
    getUserProfile,
    updateProfile,
    getAllUsers,
    getUserDetails,
    updateUser,
    deleteUser
} = require("../controllers/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route('/usuario/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(isAuthenticatedUser, logOut)
router.route('/me').get(isAuthenticatedUser, getUserProfile)
router.route('/me/updateProfile').put(isAuthenticatedUser, updateProfile)

//rutas admin
router.route('/admin/allUsers').get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
router.route('/user/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
router.route("/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

module.exports = router