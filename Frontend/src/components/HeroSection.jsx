import React from 'react'
import { assets } from './../assets/assets';
import backgroundImage from '../assets/backgroundImage.png'
import { ArrowRightIcon, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate=useNavigate()
  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 
    bg-cover bg-center h-screen'
    style={{backgroundImage: `url(${backgroundImage})`}}
    >
        <img className='max-h-11 lg:h-11 mt-20'
          src={assets.marvelLogo} 
          alt="marvel-logo"
        />
        <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold mx-w-110'>Guardians <br/> of the Galaxy</h1>

        <div className='flex items-center gap-4 text-gray-300'>
            <span>Action | Adventure | Scr-Fi</span>
            <div className='flex items-center gap-1'>
                <CalendarIcon className='w-4.5 h-4.5'/>2018
            </div>
            <div className='flex items-center gap-1'>
                <ClockIcon className='w-4.5 h-4.5'/>2h 8m
            </div>
        </div>
        <p className='max-w-md text-gray-300'>
           A group of unlikely heroes led by Star-Lord team up to stop a powerful villain threatening the galaxy. 
           Packed with action, humor, and adventure, <b>Guardians of the Galaxy</b> follows their journey to become the galaxy’s
            most unexpected protectors.     
         </p>

        <button onClick={()=>navigate('/movies')}
        className='flex items-center gap-1 px-6 py-3 text-sm
         bg-primary hover:bg-primary-dull transition rounded-full
          font-medium cursor-pointer'>
           Explore Movies
           <ArrowRightIcon className='w-5 h-5'/>
        </button>
    </div>
  )
}

export default HeroSection