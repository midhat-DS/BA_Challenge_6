
const authService = require('../../../services/authService');


module.exports={
    user (req, res) {
        res.status(200).json({
            status: 'Success',
            data: {
                userId: req.user.id,
                name: req.user.nama,
                email: req.user.email,
                roleId: req.user.roleId,
            }
        })
    },
    
    register (req, res){
        authService.registerNewUser(req.body).then((user) => {
            res.status(201).json({
            status: "OK",
            message: "Success Register New User",
            data: user,
            });
        })
        .catch((err) => {
            res.status(400).json({
            status: "FAIL",
            message: err.message,
            });
        }); 
    },
    
    login (req, res) {
        authService.login(req.body).then((user) => {
            res.status(200).json({
                status: "OK",
                message: "Success Login",
                data: user,
            });
        })
        .catch((err) => {
            res.status(err.statusCode || 400).json({
                status: "FAIL",
                message: err.message,
            });
        });
    },
    registerAdmin(req, res) {
        authService.registerAdmin(req.body).then((user) => {
        res.status(201).json({
            status: "OK",
            message: "successful, promote to admin",
            data: user,
            });
        })
        .catch((err) => {
        res.status(err.statusCode || 404).json({
            status: "FAIL",
            message: err.message,
        });
        });
    }
    
}
