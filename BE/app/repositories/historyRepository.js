const { history } = require("../models");

module.exports ={
  async create   (reqBody) {
    return await history.create({ createdBy: reqBody, });
  },
  
  async updateBy  (reqBody, id)  {
    return await history.update({ updatedBy: reqBody, }, { where: { id } });
  },
  
  async deleteBy  (reqBody, id) {
    return await history.update( { deletedBy: reqBody, }, { where: { id } } );
  }
}


