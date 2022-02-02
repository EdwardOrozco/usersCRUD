var express = require('express');
var router = express.Router();
const usersController = require("../controller/usersController");
const { check } = require("express-validator");
const loginMiddleware = require("../middlewares/loginMiddleware")


//validaciones

let validateCreateForm = [
    check("username")
        .notEmpty().withMessage("Debes diligenciar el username"),
    check("first_name")
        .notEmpty().withMessage("Debes diligenciar el nombre"),
    check("last_name")
        .notEmpty().withMessage("Debes diligenciar el apellido"),
    check("email")
        .notEmpty().withMessage("Debes diligenciar el correo")
        .isEmail().withMessage("Debes escribir un correo electrónico válido")
]


router.get('/users/', loginMiddleware, usersController.listUser);
router.get('/usersList', loginMiddleware, usersController.listUser);
router.get('/userDetails/:id', loginMiddleware, usersController.detailUser);
router.get('/createUser', loginMiddleware, usersController.createUser); // render the createUser view
router.post('/createUser', loginMiddleware, validateCreateForm, usersController.saveUser); // save the new user created
router.get('/deleteUser/:id', loginMiddleware, usersController.deleteUser);
router.post('/deleteUser/:id', loginMiddleware, usersController.processDeleteUser);

module.exports = router;