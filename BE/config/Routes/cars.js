const router = require("express").Router();
// controller 
const cars = require("../../app/controllers/api/v1/carsController");
// middleware
const IsAdmin = require('../../middlewares/isAdmin');
const Authentication = require('../../middlewares/authenticate');


router.get("/", Authentication, cars.getCarsForMember);
router.get("/admin", Authentication, IsAdmin, cars.getCars);
router.post("/addCar", Authentication, IsAdmin, cars.createCars);
router.put("/update/:id", Authentication, IsAdmin, cars.updateCars);
router.delete("/delete/:id", Authentication, IsAdmin, cars.deleteCars);

module.exports = router
