const router = require('express').Router()

// controller
const auth = require('../../app/controllers/api/v1/authController');

// middleware
const Authentication = require('../../middlewares/authenticate');
const IsSuperAdmin = require('../../middlewares/isSuperAdmin');


// API auth
router.post('/register', auth.register)
router.post('/login', auth.login)
router.get('/user', Authentication, auth.user)
router.post("/registerAdmin",  Authentication, IsSuperAdmin, auth.registerAdmin);

module.exports = router