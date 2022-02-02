const fs = require("fs");
const path = require("path");
const usersPath = path.resolve(__dirname, '../data/loginUsers.json');
const loginUsersDB = JSON.parse(fs.readFileSync(usersPath, { encoding: "utf8" }))


const loginUsersModel = {

    findByEmail: function (email) {
        
        let allUsers = loginUsersDB;
        let userFound = allUsers.find(loggingUser => loggingUser.email ===  email);
        return userFound;
    }
}

module.exports = loginUsersModel;