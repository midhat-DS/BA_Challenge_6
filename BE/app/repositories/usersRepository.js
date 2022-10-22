const {user} = require('../models')

module.exports = {
    async findUserById  (id) {
        await users.findOne({ where: { id } });
    }
}