const Booking = require("../models/bookingSchema")
const Show=require('../models/showModel')
const User=require('../models/userModel')


//! it will check the admin by using the middleware
const isAdmin=async(req,res)=>{
    res.status(200).json({success:true, isAdmin:true})
}

const getDashboardData=async(req,res)=>{
    try{
        const bookings=await Booking.find({isPaid:true})
        const activeShows=await Show.find({showDateTime:{$gte:new Date()}}).populate('movie')

        const totalUser=await User.countDocuments()

        const dashboardData={
            totalBookings:bookings.length,
            totalRevenue:bookings.reduce((acc, booking)=>acc+booking.amount, 0),
            activeShows,
            totalUser
        }

        res.status(200).json({success:true, dashboardData})
    }
    catch(err){
        console.log("getDashboardData: ", err.message)
        res.status(500).json({success:false, message:"Something went wrong"})
    }
}

const getAllShows=async(req,res)=>{
    try{
        const shows=await Show.find({showDateTime:{$gte:new Date()}}).populate('movie').sort({showDateTime:1})

        res.status(200).json({success:true, shows})
    }
    catch(err){
        console.log("getAllShowsErr: ", err.message)
        res.status(500).json({success:false, message:"Something went wrong"})
    }
}

const getAllBookings=async(req,res)=>{
    try{
        const bookings=await Booking.find({}).populate('user').populate({
            path:'show',
            populate:{path:'movie'}
        }).sort({createdAt:-1})

        res.status(200).json({success:true, bookings})
    }
    catch(err){
        console.log("getAllBookingsErr: ", err.message)
        res.status(500).json({success:false, message:'Something went wrong'})
    }
}

module.exports={isAdmin, getDashboardData, getAllShows, getAllBookings}