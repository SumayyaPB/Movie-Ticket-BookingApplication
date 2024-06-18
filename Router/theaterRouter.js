import express from 'express';
import { addMovieScheduletoScreen, addTheater, dltTheater, scheduleByMovie, theaterByCity,theaterByMovieSchedule, theatersByUser, updateTheater } from '../Controller/theaterController.js';
import { authenticateTheaterOwner } from '../Middleware/adminMiddleware.js';
const theaterRouter = express.Router();

theaterRouter.post('/createtheater',authenticateTheaterOwner,addTheater);

theaterRouter.post('/movieschedules',authenticateTheaterOwner,addMovieScheduletoScreen);

theaterRouter.get('/theaterbycity/:city',theaterByCity);

// theaterRouter.get('/theaterbyid/:id',theaterById);

theaterRouter.get('/theatersByUser', theatersByUser);

theaterRouter.patch('/updatetheater/:theaterId', updateTheater);

theaterRouter.get('/theaterbymovieSchedule/:city/:date/:movieId',theaterByMovieSchedule)

theaterRouter.get('/schedulebymovie/:theaterId/:date/:movieId',scheduleByMovie);

theaterRouter.patch('/updatetheater/:id',authenticateTheaterOwner,updateTheater);

theaterRouter.delete('/deletetheater/:id',authenticateTheaterOwner,dltTheater)


export {theaterRouter}