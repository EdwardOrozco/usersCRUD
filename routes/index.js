var express = require('express');
var router = express.Router();
const loginController = require("../controller/loginController")
const loginMiddleware = require("../middlewares/loginMiddleware")


/* GET home page. */
router.get('/', loginMiddleware, function(req, res, next) {
  res.render('index', { title: 'Sistema de Administración de Usuarios' });
});

router.get('/login', loginController.login);
router.get('/index', loginMiddleware, function(req, res, next) {
  res.render('index', { title: 'Sistema de Administración de Usuarios' });
});
router.post('/login', loginController.loginProcess);

module.exports = router;
