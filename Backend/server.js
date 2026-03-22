require('dotenv').config()
const express=require('express')
const cors=require('cors')
const {clerkMiddleware}=require('@clerk/express')
const {serve}=require('inngest/express')

const {inngest, functions}=require('./inngest')
const connectDB = require('./configs/db')

const app=express()

const PORT=process.env.PORT

//** middlewares */
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

//**routes */
app.get('/', (req,res)=>{
    res.send("Server Running")
})

app.use('/api/inngest', serve({client:inngest, functions}))

const startServer=async()=>{
    try{
        await connectDB()
       app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`)
       })
    }
    catch(err){
        console.log(err.message)
        process.exit(1)
    }
}
startServer()