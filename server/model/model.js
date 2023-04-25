const mongoose = require('mongoose')

const UserSchema =new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, unique: true, required: true },
    password: { type: String, required: true },
    address: { type: String },
    gender: {type: String, require: true},
    cars: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car"
        }
    ],
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }
    ]
})

const CarSchema = new mongoose.Schema({
    name: { type: String, required: true },
    seat: {type: Number, require: true},
    transmission: { type: String, enum: ['automatic', 'manual', 'Automatic', 'Manual'], required: true },
    fuel: { type: String, enum: ['Electricity', 'Gasoline', 'electricity', 'gasoline'], required: true }, 
    price: { type: Number, required: true },
    img: { type: String, default: null },
    available: { type: Boolean, default: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookings: { type: mongoose.Schema.Types.ObjectId, ref: "Booking"}
})

const BookingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
        startDate: { type: String },
        endDate: { type: String },
        amount: { type: Number, required: true },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Cancelled', 'Completed'],
            default: 'Pending'
        }
    },
    {
        timestamps: true,
    }
)

let User = mongoose.model("User", UserSchema)
let Car = mongoose.model("Car", CarSchema)
let Booking = mongoose.model("Booking", BookingSchema)

module.exports = {User, Car, Booking}