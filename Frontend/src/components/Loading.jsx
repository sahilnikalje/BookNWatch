import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Loading = () => {
  const{nextUrl}=useParams()
  const navigate=useNavigate()
  const {axios, getToken}=useAppContext()
  
   useEffect(()=>{
    const verifyAndRedirect=async()=>{
      if(nextUrl){
        try{
          // Verify payment status before redirecting
          await axios.get('/api/booking/verify-payment', {
            headers:{
              Authorization: `Bearer ${await getToken()}`
            }
          })
        }
        catch(err){
          console.log("Payment verification error:", err)
        }
        // Navigate after verification (or if it fails, still redirect)
        navigate('/'+nextUrl)
      }
    }

    //Give Stripe webhook a moment to process, then verify
    setTimeout(verifyAndRedirect, 3000)
  },[])

  return (
    <div className='flex justify-center items-center h-[80vh]'>
        <div className='animate-spin rounded-full h-14 w-14 border-2 border-t-primary'>
        </div>
    </div>
  )
}

export default Loading