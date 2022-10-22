const { cars, history } = require("../models");


module.exports = {
    getCars ()  {
        return cars.findAll({
            include: {
                model: history,
            },
        });
    },
    
    getCarsForMember  () {
        return cars.findAll({ 
            attributes: { exclude: ["historyId"] },
            where: { isActive : true }
        });
    },
    
    getCarById (id)  {
        return cars.findOne({ where: { id } });
    },
    
    async createCars  (reqBody) {
        return await cars.create(reqBody);
    },
    
    async updateCars  (id, reqBody)  {
        return await cars.update(reqBody, { where: { id } });
    },
    
    async deleteCars  (id)  {
        return await cars.update({ isActive: false }, { where: { id } });
    }
}