const Show=require('../models/showModel')
const Booking=require('../models/bookingSchema')

const stripe=require('stripe')

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
        const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY)

        //todo create line items for stripe
        const line_items=[{
            price_data:{
                currency:'inr',
                product_data:{
                    name:showData.movie.title
                },
                unit_amount: Math.floor(booking.amount) * 100
            },
            quantity:1
        }]

        const session=await stripeInstance.checkout.sessions.create({
            success_url:`${origin}/loading/my-bookings`,
            cancel_url:`${origin}/my-bookings`,
            line_items:line_items,
            mode:'payment',
            metadata:{
                bookingId:booking._id.toString()
            },
            expires_at:Math.floor(Date.now()/1000)+30*60 //! expires in 30 min
        })

        booking.paymentLink=session.url
        await booking.save()

        res.status(201).json({success:true, url:session.url})
    }
    catch(err){
        console.log("createBookingErr: ", err.message)
        res.status(500).json({success:false, message:"Something went wrong"})
    }
}

const getOccupiedSeats=async(req,res)=>{
    try{
        const {showId}=req.params
        const showData=await Show.findById(showId)

        const occupiedSeats=Object.keys(showData.occupiedSeats)

        res.status(200).json({success:true, occupiedSeats})
    }
    catch(err){
        console.log("getOccupiedSeatsErr: ", err.message)
        res.status(500).json({success:false, message:"Something went wrong"})
    }
}



module.exports={checkSeatsAvailability, createBooking, getOccupiedSeats}