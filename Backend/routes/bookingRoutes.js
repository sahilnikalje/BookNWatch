const express=require('express')

const { createBooking, getOccupiedSeats, verifyPayment } = require('../controllers/bookingController')

const bookingRouter=express.Router()

bookingRouter.post('/create', createBooking)
bookingRouter.get('/seats/:showId', getOccupiedSeats)
bookingRouter.get('/verify-payment', verifyPayment)

module.exports=bookingRouter