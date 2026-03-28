const { Inngest } = require("inngest");
const User = require("../models/userModel");
const Booking=require('../models/bookingSchema')
const Show=require('../models/showModel')

const inngest = new Inngest({ id: "movie-ticket-booking" });

//todo inngest function to save user data to db
const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: [{ event: "clerk/user.created" }],
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.create(userData);
  },
);

//todo inngest function to delete user from db
const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
    triggers: [{ event: "clerk/user.deleted" }],
  },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  },
);

//todo inngest function to update the user data in db
const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    triggers: [{ event: "clerk/user.updated" }],
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.findByIdAndUpdate(id, userData);
  },
);

//todo inngest function to cancel booing & release the seat after 10 minutes when user cancels the booking
const releaseSeatAndDeleteBooking=inngest.createFunction(
   {id:'release-seats-delete-booking', triggers:[{event:'app/checkpayment'}]},
   async({event, step})=>{
     const tenMinutesLater=new Date(Date.now()+10*60*1000) 
     await step.sleepUntil('wait-for-10-minutes', tenMinutesLater)

     await step.run('check-payment-status', async()=>{
       const bookingId=event.data.bookingId
       const booking=await Booking.findById(bookingId)

       //! if payment is not made then release the seat and delete booking
       if(!booking.isPaid){
         const show=await Show.findById(booking.show)
         booking.bookedSeats.forEach((seat)=>{
           delete show.occupiedSeats[seat]
         })
         show.markModified('occupiedSeats')
         await show.save()
         await Booking.findByIdAndDelete(booking._id)
       }
     })
   }
)



//todo pass function here
const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation, releaseSeatAndDeleteBooking];

module.exports = { inngest, functions };
