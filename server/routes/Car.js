const carController = require('../controllers/carController')

const router = require('express').Router()

//ADD CAR
router.post("/", carController.addCar)

//GET ALL CARS
router.get("/", carController.getCars)

//GET YOUR CAR
router.get("/my/:user", carController.getICars)

//GET AN CAR
router.get("/:id", carController.getCarById)

//UPDATE AN CAR
router.put("/:id", carController.updateCar)

//DELETE AN CAR
router.delete("/:id", carController.deleteCar)

module.exports = router