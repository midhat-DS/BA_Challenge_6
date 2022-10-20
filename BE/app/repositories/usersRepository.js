const {user} = require('../models')

module.exports = {
    create(body){
        return user.create(body)
    },
    findUser(condition){
        return user.findOne({where: condition})
    },
    findUserByPk(id){
        return user.findByPk(id);
    }
}