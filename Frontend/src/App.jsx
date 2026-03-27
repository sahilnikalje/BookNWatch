import React from "react";

import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddShows from "./pages/admin/AddShows";
import ListShows from "./pages/admin/ListShows";
import ListBookings from "./pages/admin/ListBookings";
import Loading from "./components/Loading";

import { useAppContext } from "./context/AppContext";
import { SignIn } from "@clerk/react";

function App() {
  //! id the url starts with admin, means we are on the admin page, so we dont need to show navbar on admin page
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  const { user, isAdmin, isAdminLoading } = useAppContext();

  const renderAdminElement = () => {
    if (!user) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <SignIn fallbackRedirectUrl={"/admin"} />
        </div>
      );
    }

    if (isAdminLoading) {
      return <Loading />;
    }

    if (isAdmin) {
      return <Layout />;
    }

    return (
      <div className="min-h-screen flex flex-col gap-4 justify-center items-center text-center px-4">
        <p className="text-2xl font-semibold">Not authorized</p>
        <p className="text-gray-500 max-w-md">
          Your account does not have admin access.
        </p>
      </div>
    );
  };
  return (
    <>
      {/* //todo add toaster here to use toastify notification popup */}
      <Toaster />

      {/* //! when we are not on the admin panel then only display this Navbar */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/favorite" element={<Favorite />} />

        {/* //! admin routes */}
        <Route path="/admin/*" element={renderAdminElement()}>
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>

      {/*//! same as navbar, when we are not on admin panel then only display footer */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
