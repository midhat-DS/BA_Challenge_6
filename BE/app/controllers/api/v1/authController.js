const bcrypt = require("bcryptjs");
const authService = require('../../../services/authService');


module.exports = {
    register(req, res) {
        const{email, password}= req.body;

        authService.register(email, password).then((user)=>{
            res.status(201).json({
                status:"ok",
                data: user
            })
        })
        .catch((err) => {
            res.status(400).json({
            status: "FAIL",
            message: err.message,
            });
        });
    },

    login(req, res){
        const {email, password} = req.body;
        authService.login(email, password).then((auth)=>{
            if (!auth){
                res.status(401).json({
                    status: "FAIL",
                    message: "email atau password salah",
                    })
                return ;
            }
            res.status(200).json({
                status:"OK",
                data: auth,
            })
        }).catch((err) => {
            res.status(400).json({
                status:"FAIL",
                message:err.message,
            });
        })
    },
    
    authorize(req, res, next){
        const bearerToken = req.headers.authorization;
        
        if(!bearerToken){
            res.status(403).json({
                message:"unauthorized",
            })
        }
        const token = bearerToken.split ("Bearer ")[1];

        authService.authorize(token).then((user) => {
            if (!user) {
                res.status(403).json({
                    message:"unauthorized",
                })
                return;
            }

            req.user = user;
            next();
        }).catch((err) => {
            res.status(403).json({
                message:"unauthorized",
            })
        })

    },

    whoAmI(req, res){
        const user = req.user;

        res.status(201).json({
            status: "OK",
            data : user,
        })
    }
    
}