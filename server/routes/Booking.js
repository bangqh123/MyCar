const bookingController = require('../controllers/bookingController')

const router = require('express').Router()

//ADD BOOKING
router.post("/", bookingController.addBooking)

//GET ALL BOOKINGS
router.get("/", bookingController.getAllBookings)

//GET YOUR BOOKING
router.get("/my/:user", bookingController.getIBookings)

//GET AN BOOKING
router.get("/:id", bookingController.getBookingById)

//UPDATE AN BOOKING
router.put("/:id", bookingController.updateBooking)

//DELETE AN BOOKING
router.delete("/:id", bookingController.deleteBooking)

module.exports = router