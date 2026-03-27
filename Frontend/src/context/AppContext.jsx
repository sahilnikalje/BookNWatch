import { createContext, useContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
import { toast } from "react-hot-toast";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const image_base_url=import.meta.env.VITE_TMDB_IMAGE_BASE_URL

  const { user } = useUser();
  const { getToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchIsAdmin = async () => {
    setIsAdminLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        setIsAdmin(false);
        setIsAdminLoading(false);
        return;
      }

      const { data } = await axios.get("/api/admin/is-admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsAdmin(!!data.isAdmin);

      if (!data.isAdmin && location.pathname.startsWith("/admin")) {
        navigate("/");
        toast.error("Not authorized");
      }
    } catch (err) {
      setIsAdmin(false);
      if (location.pathname.startsWith("/admin")) {
        navigate("/");
        toast.error("Not authorized");
      }
      // console.log("fetchIsAdminErr: ", err.message)
    } finally {
      setIsAdminLoading(false);
    }
  };

  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) {
        setShows(data.shows);
      } else {
        toast.error(data.message || "Failed to load shows");
      }
    } catch (err) {
      console.log("fetchShowsErr: ", err.message);
    }
  };

  const fetchFavoriteMovies = async () => {
    try {
      const { data } = await axios.get("/api/user/favorites", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setFavoriteMovies(data.movies);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log("fetchFavoriteMoviesErr: ", err.message);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);
  // useEffect(()=>{
  //     if(user){
  //         fetchIsAdmin()
  //         fetchFavoriteMovies()
  //     }
  // },[user])
  useEffect(() => {
    if (user && location.pathname.startsWith("/admin")) {
      setIsAdminLoading(true);
      const init = async () => {
        const token = await getToken();
        if (token) {
          fetchIsAdmin();
          fetchFavoriteMovies();
        } else {
          setIsAdmin(false);
          setIsAdminLoading(false);
        }
      };
      init();
    } else {
      setIsAdmin(false);
      setIsAdminLoading(false);
    }
  }, [user, location.pathname]);
  const value = {
    axios,
    fetchIsAdmin,
    fetchShows,
    fetchFavoriteMovies,
    getToken,
    navigate,
    user,
    isAdmin,
    isAdminLoading,
    shows,
    favoriteMovies,
    image_base_url
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
