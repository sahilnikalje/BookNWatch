const {clerkClient}=require('@clerk/express')

const protectAdmin=async(req,res,next)=>{
    try{
        const{userId}=req.auth()
        if (!userId) {
         return res.status(401).json({ success: false, message: "Not authorized" })
        }
        const user=await clerkClient.users.getUser(userId)

        if(user.privateMetadata.role !== 'admin'){
            return res.status(401).json({success:false, message:"Not authorized"})
        }

        next()
    }
    catch(err){
        console.log("protectAdminErr: ", err.message)
        res.status(500).json({success:false, message:"Not Authorized"})
    }
}

module.exports=protectAdmin