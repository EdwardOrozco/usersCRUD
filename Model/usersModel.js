const fs = require("fs");
const path = require("path");
const usersPath = path.resolve(__dirname, '../data/users.json');
const { validationResult } = require("express-validator");
let usersDB = JSON.parse(fs.readFileSync(usersPath, { encoding: "utf8" }))


const usersModel = {

    showUsers: function () {
        return JSON.parse(
            fs.readFileSync(usersPath, {
                encoding: "utf8",
            })
        );
    },

    deleteUser: function (userId) {
        let infoUser = usersDB.find((item => item.id == userId));
        for (let i = 0; i <= usersDB.length; i++) {
            if (infoUser != usersDB[i]) {
                usersDB;
            }
            else {
                usersDB.splice(i, 1);
            }
        };
        let usersDBUpdated = JSON.stringify(usersDB);
        fs.writeFileSync(usersPath, usersDBUpdated);
    },

    createUser: function (req, res, newUserInfo) {

        //defining max id value
        let lastUser = usersDB[usersDB.length - 1];
        let maxId = lastUser.id;

        //getting user info from form input
        newUserInfo = {
            id: (maxId + 1),
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }

        //creating new user if validations above are true
        usersDB.push(newUserInfo);
        usersDBUpdated = JSON.stringify(usersDB);
        fs.writeFileSync("./data/users.json", usersDBUpdated);
    }
}

module.exports = usersModel;