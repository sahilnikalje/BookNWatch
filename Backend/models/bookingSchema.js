const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    user:{type:String, required:true, ref:'User'},
    show:{type:String, required:true, ref:'Show'},
    amount:{type:Number, required:true},
    bookedSeats:{type:Array, required:true},
    isPaid:{type:Boolean, default:false},
    paymentLink:{type:String},
},{
    timestamps:true
})

module.exports=mongoose.model("Booking", bookingSchema)