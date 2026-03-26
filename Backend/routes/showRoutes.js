const express=require('express')
const {getNowPlayingMovies, addShow, getShows, getShow} = require('../controllers/showController')
const protectAdmin=require('../middlewares/authMiddleware')

const showRouter=express.Router()

showRouter.get('/now-playing',protectAdmin, getNowPlayingMovies)
showRouter.post('/add', protectAdmin, addShow)
showRouter.get('/all', getShows)
showRouter.get('/:movieId', getShow)

module.exports=showRouter