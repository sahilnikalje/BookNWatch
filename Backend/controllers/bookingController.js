const Show=require('../models/showModel')
const Booking=require('../models/bookingSchema')

const checkSeatsAvailability=async(showId, selectedSeats)=>{
    try{
      const showData=await Show.findById(showId)
      if(!showData){
        return false
      }
      const occupiedSeats=showData.occupiedSeats
      const isAnySeatTaken=selectedSeats.some(seat=>occupiedSeats[seat])

      return !isAnySeatTaken
    }
    catch(err){
        console.log(err.message)
        return false
    }
}

const createBooking=async(req, res)=>{
    try{
        const {userId}=req.auth()
        const {showId, selectedSeats}=req.body
        const{origin}=req.headers

        //todo check if the seat is available for the selected show or not
        const isAvailable=await checkSeatsAvailability(showId, selectedSeats)

        if(!isAvailable){
            return res.status(400).json({success:false, message:"Selected seats are not available"})
        }

        const showData=await Show.findById(showId).populate('movie')

        //todo create new booking
        const booking=await Booking.create({
            user:userId,
            show:showId,
            amount:showData.showPrice*selectedSeats.length,
            bookedSeats:selectedSeats
        })
        selectedSeats.map((seat)=>{
             showData.occupiedSeats[seat]=userId
        })
        showData.markModified('occupiedSeats')

        await showData.save()

        //todo payment gateway


        res.status(201).json({success:true, message:"Booked Successfully"})
    }
    catch(err){
        console.log("createBookingErr: ", err.message)
        res.status(500).json({success:false, message:"Something went wrong"})
    }
}

const getOccupiedSeats=async()=>{
    try{
        const {showId}=rew.params
        const{showData}=await Show.findById(showId)

        const occupiedSeats=Object.keys(showData.occupiedSeats)

        res.status(200).json({success:true, occupiedSeats})
    }
    catch(err){
        console.log("getOccupiedSeatsErr: ", err.message)
        res.status(500).json({success:false, message:"Something went wrong"})
    }
}



module.exports={checkSeatsAvailability, createBooking, getOccupiedSeats}