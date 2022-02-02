function loginMiddleware(req, res, next){
    
    if (req.session.userLogged) {
        next();
    }
    else{
        return res.redirect("/login");
    }
}

module.exports = loginMiddleware;