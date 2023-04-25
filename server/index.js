const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const carRouter = require('./routes/Car')
const userRouter = require('./routes/User')
const authRouter = require('./routes/Auth')
const bookingRouter = require('./routes/Booking') 

dotenv.config()
//Connect mongoose
mongoose.connect((process.env.MongoDB_URL), () => {
    console.log("🚀🚀🚀 Connect to MongoDB")
})

app.use(bodyParser.json({limit:"50mb"}))
app.use(cors())
app.use(morgan("common"))

//Router
app.use("/api/car", carRouter)
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/booking", bookingRouter)

app.listen(4000, () => {
    console.log('🚀🚀🚀 Server ready at http://localhost:4000')
})