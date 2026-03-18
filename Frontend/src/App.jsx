import React from 'react'

import {Route, Routes, useLocation} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import Navbar from './components/Navbar';
import Footer from './components/Footer'

import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import SeatLayout from './pages/SeatLayout';
import MyBookings from './pages/MyBookings';
import Favorite from './pages/Favorite';

function App() {
  //! id the url starts with admin, means we are on the admin page, so we dont need to show navbar on admin page
  const isAdminRoute= useLocation().pathname.startsWith('/admin')
  return (
    <>
    {/* //todo add toaster here to use toastify notification popup */}
    <Toaster/>

      {/* //! when we are not on the admin panel then only display this Navbar */}
      {!isAdminRoute && <Navbar/>}

      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/movies' element={<Movies/>}/>
          <Route path='movies/:id' element={<MovieDetails/>}/>
          <Route path='/movies/:id/:date' element={<SeatLayout/>}/>
          <Route path='/my-bookings' element={<MyBookings/>}/>
          <Route path='/favorite' element={<Favorite/>}/>
      </Routes>

       {/*//! same as navbar, when we are not on admin panel then only display footer */}
      {!isAdminRoute && <Footer/>}
    </>
  )
}

export default App