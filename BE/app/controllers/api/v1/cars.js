    /**
     * @file contains request handler of post resource
     * @author Fikri Rahmat Nurhidayat
     */
    const postService = require('../../../services/postService');

    module.exports = {
    list(req, res) {
        postService.list()
        .then((posts) => {
            res.status(200).json({
            status: "OK",
            data: {
                post: posts.data,
                count : posts.count
            },
            });
        })
        .catch((err) => {
            res.status(400).json({
            status: "FAIL",
            message: err.message,
            });
        });
    },
    
    create(req, res) {
        const body = req.body
        postService.create(body)
        .then((post) => {
            res.status(201).json({
            status: "OK",
            data: post,
            });
        })
        .catch((err) => {
            res.status(201).json({
            status: "FAIL",
            message: err.message,
            });
        });
    },
    
    update(req, res) {
        postService.update(req.body, req.params.id)
        .then((post) => {
            res.status(200).json({
            status: "OK",
            data: post,
            });
        })
        .catch((err) => {
            res.status(422).json({
            status: "FAIL",
            message: err.message,
            });
        });
    },
    
    show(req, res) {
        postService.getDetail(req.params.id)
        .then((post) => {
            res.status(200).json({
            status: "OK",
            data: post,
            });
        })
        .catch((err) => {
            res.status(422).json({
            status: "FAIL",
            message: err.message,
            });
        });
    },
    
    destroy(req, res) {
        postService.destroy(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch((err) => {
            res.status(422).json({
            status: "FAIL",
            message: err.message,
            });
        });
    },
    
    // setCars(req, res, next) {
    //     cars.findByPk(req.params.id)
    //     .then((cars) => {
    //         if (!cars) {
    //         res.status(404).json({
    //             status: "FAIL",
    //             message: "cars not found!",
    //         });
    
    //         return;
    //         }
    
    //         req.cars = cars;
    //         next()
    //     })
    //     .catch((err) => {
    //         res.status(404).json({
    //         status: "FAIL",
    //         message: "Post not found!",
    //         });
    //     });
    // },
    };
    