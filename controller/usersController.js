const usersModel = require("../model/usersModel");
const { validationResult } = require("express-validator");
const showUsers = usersModel.showUsers();
const fs = require("fs");
const path = require("path");
const usersPath = path.resolve(__dirname, '../data/users.json');
let usersDB = JSON.parse(fs.readFileSync(usersPath, { encoding: "utf8" }))


const userController = {

    listUser: function (req, res) { // works well
        res.render("usersList", { showUsers: showUsers })
    },

    createUser: function (req, res) { //works well
        res.render("createUser")
    },

    saveUser: function (req, res) {

        let newUserInfo = req.body;
        let errors = validationResult(req);
        let usersDBString = JSON.stringify(usersDB);
        let emailUsed = usersDBString.includes(req.body.email);
        let usernameUsed = usersDBString.includes(req.body.username);

        if (errors.isEmpty() && !emailUsed && !usernameUsed) {
            usersModel.createUser(req, res, newUserInfo);
            res.redirect("/users/usersList");
        }
        else {
            if (errors.isEmpty() && emailUsed) {
                let errorEmail = {
                    msg: "Este correo ya se encuentra registrado con una cuenta"
                };
                res.render("createUser", { errorEmail, old: req.body })
            }
            else if (errors.isEmpty() && usernameUsed) {
                let errorUsername = {
                    msg: "Este username ya se encuentra registrado con una cuenta"
                };
                res.render("createUser", { errorUsername, old: req.body })
            }
            else {
                res.render("createUser", { errors: errors.mapped(), old: req.body })
            };
        }
    },

        deleteUser: function (req, res) { // works well
            let userId = req.params.id;
            let infoUser = showUsers.find((item => item.id == userId));
            if (infoUser) {
                res.render("deleteUser", { infoUser })
            }
            else {
                res.send("Este id no pertenece a ningún usuario registrado actualmente.");
            }
        },

        processDeleteUser: function (req, res) {
            let userId = req.params.id;
            usersModel.deleteUser(userId);
            res.redirect("/users/usersList");
        },

        detailUser: function (req, res) { //works well
            let userId = req.params.id;
            let userInfo = showUsers.find((item => item.id == userId));
            if (userInfo) {
                res.render("userDetails", { userInfo });
            }
            else {
                res.send("Este id no pertenece a ningún usuario registrado actualmente.");
            }
        }
    }

module.exports = userController;