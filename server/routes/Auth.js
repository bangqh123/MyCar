const authController = require('../controllers/authController')

const router = require('express').Router()

//REGISTER
router.post("/register", authController.Register)

//LOGIN
router.post("/login", authController.Login)

module.exports = router