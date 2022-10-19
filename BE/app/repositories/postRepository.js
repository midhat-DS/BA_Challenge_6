const { cars } = require("../models");
const { create, update } = require("../services/postService");

module.exports = {
    getAll(){
        return cars.findAll();
    },

    create(body){
        return cars.create(body);
    },

    update(body, id){
        return cars.update(body, {where:{id}});
    },

    delete(id){
        return cars.destroy({where : {id}});
    },

    getById(id){
        return cars.findByPk(id);
    },

    getTotalCount(){
        return cars.count();
    },
}