const carsRepository = require("../repositories/carsRepository");
const history = require("../repositories/historyRepository");

module.exports = {
    async getCars (){
        const cars = await carsRepository.getCars();
        return cars;
    },
    async getCarsForMember () {
        const cars = await carsRepository.getCarsForMember();
        return cars;
    },
        //fungsi menambahkan mobil baru ke tabel cars
    async createCars (reqBody, userName) {
        const { name, price, size } = reqBody;
        const createHistory = await history.create(userName);
        const historyId = createHistory.id;
        const newCar = { name, price, size, isActive: true, historyId };
        return await carsRepository.createCars(newCar);
    },
    
    async updateCars  (reqBody, userName, carsId){
        const { name, price, size } = reqBody;
    
        const upCars = { name, price, size };
        const cars = await carsRepository.getCarById(carsId);
        history.updateBy(userName, cars.historyId);
        await carsRepository.updateCars(carsId, upCars);
        return carsRepository.getCarById(carsId);
    },
    async deleteCars (userName, carsId) {
        const historyId = await carsRepository.getCarById(carsId);
        history.deleteBy(userName, historyId.historyId);
        return await carsRepository.deleteCars(carsId);
    }
}

