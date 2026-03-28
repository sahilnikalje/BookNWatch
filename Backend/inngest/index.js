const { Inngest } = require("inngest");
const User = require("../models/userModel");
const Booking=require('../models/bookingSchema')
const Show=require('../models/showModel');
const sendEmail = require("../configs/nodeMailer");
const {bookingConfirmationTemplate, reminderTemplate, newShowTemplate}=require('../configs/emailTemplates')

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

//todo inngets function to send mail when user books a show
const sendBookingConfirmationEmail=inngest.createFunction(
  {id:'send-booking-confirmation-email', triggers:[{event:'app/show.booked'}]},
  async({event, step})=>{
    const{bookingId}=event.data

    const booking=await Booking.findById(bookingId).populate({
       path:'show', 
       populate:{path:'movie', model:'Movie'}
    }).populate('user')

    await sendEmail({
      to:booking.user.email,
      subject:`Payment Confirmation: "${booking.show.movie.title}" booked!`,
      body:bookingConfirmationTemplate(booking)
    })
  }
)

//todo inngest function to nsend reminders
const sendShowReminders=inngest.createFunction(
  {id:'send-show-reminders', triggers:[{cron: "0 */8 * * *"}]}, //!every 8 hrs
  async({step})=>{
    const now=new Date()
    const in8Hours=new Date(now.getTime() + 8 * 60 * 60 * 1000)
    const windowStart=new Date(in8Hours.getTime() - 10 * 60 * 1000)

    //! prepare reminder task
    const reminderTasks=await step.run('prepare-reminder-tasks', async()=>{
       const shows=await Show.find({
         showTime:{$gte:windowStart, $lte: in8Hours},
       }).populate('movie')

       const tasks=[]

       for(const show of shows){
         if(!show.movie || !show.occupiedSeats) continue

         const userIds=[...new Set(Object.values(show.occupiedSeats))]
         if(userIds.length===0) continue
         const users=await User.find({_id:{$in: userIds}}).select("name email")

         for(const user of users){
           tasks.push({
             userEmail:user.email,
             userName:user.name,
             movieTitle:show.movie.title,
             showTime:show.showTime,
           })
         }
       }
       return tasks
    })
    if(reminderTasks.length===0){
      return {sent:0, message:'No reminders to send'}
    }

    //! send reminder email
    const results=await step.run('send-all-reminders', async()=>{
       return await Promise.allSettled(
         reminderTasks.map(task=>sendEmail({
           to:task.userEmail,
           subject:`Reminder: Your movie "${task.movieTitle}" starts soon!`,
           body: reminderTemplate(task)
         }))
       )
    })

    const sent=results.filter(r=>r.status==='fulfilled').length
    const failed=results.length-sent

    return {
       sent,
       failed,
       message:`Sent ${sent} reminders(s), ${failed} failed`
    }
  }
)

//todo inngest function to send notification when a new show is added
const sendNewShowNotifications=inngest.createFunction(
  {id:'send-new-show-notification', triggers:[{event:'app/show.added'}]},
  async({event})=>{
     const {movieTitle}=event.data

     const users=await User.find({})

     for(const user of users){
        const userEmail=user.email
        const userName=user.name

        const subject=`🎬 New Show Added: ${movieTitle}`
        const body=newShowTemplate({userName, movieTitle})

        await sendEmail({
          to:userEmail,
          subject,
          body
        })
     }
     return{message:"Notification sent"}
  }
)





//todo pass function here
const functions = [
       syncUserCreation, 
       syncUserDeletion, 
       syncUserUpdation, 
       releaseSeatAndDeleteBooking, 
       sendBookingConfirmationEmail, 
       sendShowReminders,
       sendNewShowNotifications
      ];

module.exports = { inngest, functions };
