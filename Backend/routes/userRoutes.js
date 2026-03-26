const express=require('express')
const { getUserBookings, updateFavorite, getFavorites } = require('../controllers/userController')

const userRouter=express.Router()

userRouter.get('/bookings', getUserBookings)
userRouter.post('/update-favorite', updateFavorite)
userRouter.get('/favorites', getFavorites)


module.exports=userRouter
