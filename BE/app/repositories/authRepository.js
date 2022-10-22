// import models
const { users, role } = require('../models')

module.exports = {
    async createUser (createArgs) {
        return users.create(createArgs);
    },
    async findEmail (email) {

        const user = users.findOne({where: {email,}, include: {model: role,}});
        return user
    },
    async updateToAdmin (user) {
        const {email} = user;
        await users.update({ roleId: 2 }, { where: { email } });
    }
}