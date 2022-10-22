const jwt = require('jsonwebtoken');
const { users } = require('../app/models');

module.exports = function (req, res, next) {

    try {
        const bearerToken = req.headers.authorization 
        const bearer = bearerToken.split(' ');
        const token = bearer[1];

        if(!token) {
            return res.status(401).json({
                status: 'fail',
                message: "required authorization"
            })
        }

        const payload = jwt.verify(token, 'rahasia');
        console.log('Payload:', payload)
        users.findByPk(payload.id)
            .then(instance => {
                req.user = instance;
                next()
            })
    }

    catch {
        res.status(401).json({
            status: 'fail',
            message: "Invalid Token"
        })
    }
}