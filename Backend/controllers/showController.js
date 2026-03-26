const { default: axios } = require("axios");
const Movie = require("../models/movieModel");
const Show=require('../models/showModel')


//todo api to get now playing movies from tmdb
const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      },
    );
    const movies = data.results;

    res.status(200).json({ success: true, movies: movies });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong" });
    console.log("showControllerErr: ", err.message);
  }
};

//todo api to add new show
const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    let movie = await Movie.findById(movieId);

    if (!movie) {
      //todo fetch movie details
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }),

        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }),
      ]);

      const movieApiData=movieDetailsResponse.data
      const movieCreditsdata=movieCreditsResponse.data

      const movieDetails={
         _id:movieId,
         title:movieApiData.title,
         overview:movieApiData.overview,
         poster_path:movieApiData.poster_path,
         backdrop_path:movieApiData.backdrop_path,
         genres:movieApiData.genres,
         release_date:movieApiData.release_date,
         original_language:movieApiData.original_language,
         tagline:movieApiData.tagline || "",
         vote_average:movieApiData.vote_average,
         runtime:movieApiData.runtime
      }

      //todo add movie to db
      movie=await Movie.create(movieDetails)
    }

    const showsToCreate=[]
    showsInput.forEach(show=>{
        const showDate=show.date
        show.time.forEach((time)=>{
            const dateTimeString=`${showDate}T${time}`
            showsToCreate.push({
                movie:movieId,
                showDateTime:new Date(dateTimeString),
                showPrice,
                occupiedSeats:{}
            })
        })
    })

    if(showsToCreate.length>0){
        await Show.insertMany(showsToCreate)
    }
    res.status(200).json({success:true, message:"Show added successfully"})
  } catch (err) {
    console.log("addShowErr: ", err.message);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

//todo api to get all shows from db
const getShows=async(req,res)=>{
    try{
        const shows=await Show.find({
            showDateTime:{$gte: new Date()}
        }).populate('movie').sort({showDateTime:1})

        //** filter unique shows */
        const uniqueShows=new Set(shows.map(show=>show.movie))

        res.status(200).json({success:true, shows:Array.from(uniqueShows)})
    }
    catch(err){
        console.log("getShowsErr: ", err.message)
        res.status(500).json({success:false, message:"Something went wrong"})
    }
}

//todo api to get single show from db
const getShow=async(req,res)=>{
    try{
        const {movieId}=req.params

        const shows=await Show.find({movie:movieId, showDateTime: {$gte: new Date()}})
        const movie=await Movie.findById(movieId)
        const dateTime={}

        shows.forEach((show)=>{
            const date=show.showDateTime.toISOString().split("T")[0]
            if(!dateTime[date]){
                dateTime[date]=[]
            }
            dateTime[date].push({time:show.showDateTime, showId:show._id})
        })
        res.status(200).json({success:true, movie, dateTime})
    }
    catch(err){
        console.log("getShow: ", err.message)
        res.status(500).json({success:false, message:"Something went wrong"})
    }
}

module.exports = {getNowPlayingMovies, addShow, getShows, getShow};
