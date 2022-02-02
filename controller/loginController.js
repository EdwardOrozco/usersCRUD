const loginModel = require("../model/loginModel");

const loginController = {

    login: (req, res) => {
        res.render("login")
    },

    loginProcess: (req, res) => {
        let email = req.body.email
        let userToLogin = loginModel.findByEmail(email);

        if (userToLogin && (userToLogin.password === req.body.password)) {
            req.session.userLogged = userToLogin;
            res.redirect("/index");
            return req.session.UserLogged;
        } else {
            let errors = {
                msg: "Credenciales incorrectas"
            }
            res.render("login", { errors })
        }
        return req.session.UserLogged;
    }
}

module.exports = loginController;