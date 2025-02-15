const ProtectedRoute = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.status(401).json({msg: "Not authenticated"})
    }
    next();
}

module.exports = ProtectedRoute;