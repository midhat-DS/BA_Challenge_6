

module.exports = function (req, res, next) {

    if (req.user.roleId == 1) {
        next();
    } else {
    res.status(401).json({
        status: "Unauthorized Access",
        message: "only super admin can access this page",
    });
    }

};
