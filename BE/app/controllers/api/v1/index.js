/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const cars = require("./carsController");
const auth = require("./authController")

module.exports = {
  cars,
  auth

};
