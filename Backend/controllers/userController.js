const Booking=require('../models/bookingSchema')
const Movie=require('../models/movieModel')
const {clerkClient}=require('@clerk/express')

const getUserBookings=async(req,res)=>{
    try{
        const user=req.auth().userId

        const bookings=await Booking.find({user}).populate({
            path:"show",
            populate:{path:'movie'}
        }).sort({createdAt:-1})

        res.status(200).json({success:true, bookings})
    }
    catch(err){
        console.log("getUserBookingsErr: ", err.message)
        res.status(500).json({success:false, message:"Something went wrong"})
    }
}

// const addFavorite=async(req,res)=>{
//     try{
//         const {movieId}=req.body
//         const userId=req.auth().userId

//         const user=await clerkClient.users.getUser(userId)

//         if(!user.privateMetadata.favorites){
//             user.privateMetadata.favorites=[]
//         }
//         if(!user.privateMetadata.favorites.includes(movieId)){
//             user.privateMetadata.favorites.push(movieId)
//         }

//         await clerkClient.users.updateUserMetadata(userId, {privateMetadata: user.privateMetadata})

//         res.status(201).json({success:true, message:"favorite added successfully"})
//     }
//     catch(err){
//         console.log("addFavoriteErr: ", err.message)
//         res.status(500).json({success:true, message:"Something went wrong"})
//     }
// }

const updateFavorite=async(req,res)=>{
    try{
        const {movieId}=req.body
        const userId=req.auth().userId

        const user=await clerkClient.users.getUser(userId)

        if(!user.privateMetadata.favorites){
            user.privateMetadata.favorites=[]
        }
        if(!user.privateMetadata.favorites.includes(movieId)){
            user.privateMetadata.favorites.push(movieId)
        }
        else{
            user.privateMetadata.favorites=user.privateMetadata.favorites.filter(item=>item!==movieId)
        }

        await clerkClient.users.updateUserMetadata(userId, {privateMetadata: user.privateMetadata})

        res.status(201).json({success:true, message:"favorite movies updated"})
    }
    catch(err){
        console.log("addFavoriteErr: ", err.message)
        res.status(500).json({success:true, message:"Something went wrong"})
    }
}

const getFavorites=async(req,res)=>{
    try{
        const user=await clerkClient.users.getUser(req.auth().userId)
        const favorites=user.privateMetadata.favorites

        const movies=await Movie.find({_id:{$in:favorites}})

        res.status(200).json({success:true, movies})
    }
    catch(err){
        console.log("addFavoriteErr: ", err.message)
        res.status(500).json({success:true, message:"Something went wrong"})    
    }
}
module.exports={getUserBookings, updateFavorite, getFavorites}