const userController = require('../controllers/userController')

const router = require('express').Router()

//GET ALL USERS
router.get("/", userController.getUsers)

//GET AN USER
router.get("/:id", userController.getUserByID)

//UPDATE AN USER
router.put("/:id", userController.updateUser)

//DELETE AN USER
router.delete("/:id", userController.deleteUser)

module.exports = router