import express from 'express'
import { addCelebtoMovie, addMovie, dltMovie, getMovieById, getMovies, updateMovie } from '../Controller/movieController.js';
import { authenticateTheaterOwner } from '../Middleware/adminMiddleware.js';
const movieRouter = express.Router();

movieRouter.post('/addmovie',authenticateTheaterOwner,addMovie);

movieRouter.post('/addcelebrity',authenticateTheaterOwner,addCelebtoMovie)

movieRouter.get('/getmovies',getMovies);

movieRouter.get('/getmovies/:id',getMovieById);

movieRouter.patch('/updatemovie/:id',authenticateTheaterOwner,updateMovie)

movieRouter.delete('/deletemovie/:id',authenticateTheaterOwner,dltMovie)

export {movieRouter}