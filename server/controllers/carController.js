const mongoose = require('mongoose')
const {User, Car} = require('../model/model')

const carController = {
    // Create a new car
    addCar: async(req, res)=> {
        try {
            const newCar = new Car(
                {
                    name: req.body.name,
                    transmission: req.body.transmission,
                    fuel: req.body.fuel,
                    seat: req.body.seat,
                    price: req.body.price,
                    img: req.body.img,
                    available: req.body.available,
                    user: req.body.user
                }
            )
            const saveCar = await newCar.save()
            if(req.body.user) {
                const user = User.findById(req.body.user)
                await user.updateOne({ $push: { cars: saveCar._id } })
            }
            res.status(200).json(saveCar)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error creating car' })
        }
    },

    // Get all cars
    getCars: async(req, res)=> {
        try {
            const allCars = await Car.find()
            res.status(200).json(allCars)
        } catch (error) {
            console.error(error)
            res.status(500).json('Error getting cars')
        }
    },

    // Get your car
    getICars: async (req, res) => {
        try {
            const userId = req.params.user
            const cars = await Car.find({ user: mongoose.Types.ObjectId(userId) }).exec();
            if (cars.length === 0) {
            res.status(404).json({ error: "No cars found for this user." });
          } else {
            res.status(200).json(cars);
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: error.message });
        }
    },

    // Get a single car by id
    getCarById: async(req, res)=> {
        try {
            const car = await Car.findById(req.params.id).populate("user")
            res.status(200).json(car)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error getting car' })
        }
    },

    // Update an existing car
    updateCar: async(req, res)=> {
        try {
            const car = await Car.findById(req.params.id)
            if(!car) return res.status(404).json('Car not found')
            await car.updateOne({
                name: req.body.name,
                price: req.body.price,
                seat: req.body.seat,
                transmission: req.body.transmission,
                fuel: req.body.fuel,
                available: req.body.available,
            })
            const updatedCar = await Car.findById(req.params.id)
            res.status(200).json(updatedCar)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error updating car' })
        }
    },

    // Delete a car by ID
    deleteCar: async(req, res)=> {
        try {
            const car = await Car.findById(req.params.id)
            if(!car) return res.status(401).json('Car not found')
            await User.updateMany(
                {cars: req.params.id},
                {$pull: {cars: req.params.id}}
            )
            await Car.findByIdAndDelete(req.params.id)
            res.status(200).json("Deleted successfully!")
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error deleting car' })
        }
    },
}

module.exports = carController