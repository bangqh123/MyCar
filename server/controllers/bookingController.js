const mongoose = require('mongoose')
const {User, Car, Booking} = require('../model/model')

const bookingController = {
    // Create a new booking
    addBooking: async(req, res)=> {
        try {
            const newBooking = new Booking(
                {
                    user: req.body.user,
                    car: req.body.car,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    amount: req.body.amount,
                    status: req.body.status,
                }
            )
            const saveBooking = await newBooking.save()
            if(req.body.user) {
                const user = User.findById(req.body.user)
                await user.updateOne({ $push: { bookings: saveBooking._id } })
            }
            if(req.body.car) {
                const car = Car.findById(req.body.car)
                await car.updateMany(
                    {_id: req.body.car},
                    {
                        $push: {bookings: saveBooking._id},
                        $set: {available: false}
                    }
                )
            }
            res.status(200).json(saveBooking)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error creating booking' })
        }
    },

    // Get all bookings
    getAllBookings: async(req, res)=> {
        try {
            const allBookings = await Booking.find()
            res.status(200).json(allBookings)
        } catch (error) {
            console.error(error)
            res.status(500).json('Error getting booking')
        }
    },

    // Get your booking
    getIBookings: async (req, res) => {
        try {
            const userId = req.params.user
            const bookings = await Booking.find({ user: mongoose.Types.ObjectId(userId) }).exec();
            if (bookings.length === 0) {
            res.status(404).json({ error: "No bookings found for this user." });
          } else {
            res.status(200).json(bookings);
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: error.message });
        }
    },

    // Get a single booking by ID
    getBookingById: async(req, res)=> {
        try {
            const booking = await Booking.findById(req.params.id).populate("user")
            res.status(200).json(booking)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error getting booking' })
        }
    },

    // Update an existing booking
    updateBooking: async(req, res)=> {
        try {
            const booking = await Booking.findById(req.params.id)
            if(!booking) return res.status(404).json('Car not found')
            await booking.updateOne({
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                status: req.body.status,
            })
            const updatedBooking = await Booking.findById(req.params.id)
            res.status(200).json(updatedBooking)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error updating car' })
        }
    },

    // Delete a booking by id
    deleteBooking: async(req, res)=> {
        try {
            const booking = await Booking.findById(req.params.id)
            if(!booking) return res.status(401).json('Booking not found')
            await User.updateMany(
                {bookings: req.params.id},
                {$pull: {bookings: req.params.id}}
            )
            await Car.updateMany(
                {bookings: req.params.id},
                {$pull: {bookinss: req.params.id}}
            )
            await Booking.findByIdAndDelete(req.params.id)
            res.status(200).json("Deleted successfully!")
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error deleting booking' })
        }
    },
}

module.exports = bookingController