const stripe=require('stripe')
const Booking=require('../models/bookingSchema')


const stripeWebhooks=async(req,res)=>{
    const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY)
    const sig=request.headers['stripe-signature']

    let event

    try{
        event=stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    }
    catch(err){
        console.log("stripeWebhooksErr: ", err.message)
        return res.status(400).send(`Webhooks error: ${err.message}`)
    }

    try{
        switch(event.type){
            case 'payment_intent.succeeded':{
                const paymentIntent=event.data.object
                const sessionList=await stripeInstance.checkout.sessions.list({
                    payment_intent:paymentIntent.id
                })
                const session=sessionList.data[0]
                const {bookingId}=session.metadata

                await Booking.findByIdAndUpdate(bookingId, {
                    isPaid:true,
                    paymentLink:''
                })
                break
            }
            default:
                console.log('Unhandled event type: ', event.type)
        }
        response.json({received:true})
    }
    catch(err){
        console.log('Webhook processing error: ', err)
        response.status(500).send("Internal Server Error")
    }
}

module.exports=stripeWebhooks