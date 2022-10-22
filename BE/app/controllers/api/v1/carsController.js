const carsService = require("../../../services/carsService");


module.exports ={
    getCarsForMember (req, res) {
        carsService.getCarsForMember(req.body).then((cars) => {
            res.status(200).json({
                status: "OK",
                message: "Success",
            data: cars,
            });
        })
        .catch((err) => {
            res.status(404).json({
                status: "FAIL",
                message: err.message,
            });
        }); 
    },
    getCars(req, res) {
        carsService.getCars().then((cars) => {
                res.status(200).json({
                status: "OK",
                message: "Success",
                data: cars,
                });
            })
            .catch((err) => {
                res.status(404).json({
                status: "FAIL",
                message: err.message,
                });
            }); 
        },

        createCars  (req, res) {
            carsService.createCars(req.body, req.user.name).then((cars) => {
                res.status(201).json({
                status: "Success",
                message: "Success Add New Car",
                data: cars,
                });
            })
            .catch((err) => {
                res.status(err.statusCode || 400).json({
                    status: "FAIL",
                    message: err.message,
                });
            }); 
            
        },

        updateCars (req, res)  {
            carsService.updateCars( req.body, req.user.name, req.params.id).then((cars) => {
                res.status(200).json({
                status: "Success",
                message: "Success Update Car Data",
                data: cars,
                });
            })
            .catch((err) => {
                res.status(err.statusCode || 400).json({
                    status: "FAIL",
                    message: err.message,
                });
            }); 
        },
                
        deleteCars (req, res) {
            carsService.deleteCars(req.user.nama, req.params.id).then(() => {
                res.status(200).json({
                status: "Success",
                message: `Success Delete Car with id : ${req.params.id}, deleted by ${req.user.nama} `,
                });
        })
        .catch((err) => {
            res.status(err.statusCode || 400).json({
                status: "FAIL",
                message: err.message,
            });
        }); 
    }
}
