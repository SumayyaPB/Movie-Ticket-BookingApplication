import BOOKING from '../model/bookingModel.js';
import MOVIE from '../model/movieModel.js';
import USER from '../model/userModel.js'
import { PAYMENT } from '../model/paymentModel.js';
import THEATER from '../model/theaterModel.js'

const bookingTicket = async(req,res)=>{
    try {
        const {showTime,showDate,movieId,theaterId,seat,totalPrice,paymentType,userId} = req.body

        // const payment = await PAYMENT.findById(paymentId)
        // if(!payment){
        //     res.status(404).json("payment not found")
        // }
       console.log(req.body)
        const theater = await THEATER.findById(theaterId);
        if(!theater){
            res.status(404).json('Theater not found')
        }

        const movie = await MOVIE.findById(movieId)
        if(!movie){
            req.status(404).json('movie not found')
        }

        
        const movieSchedules = theater.movieSchedules.find(schedule=>{
            console.log(schedule);
            let showDate1 = new Date(schedule.showDate);
            let showDate2 = new Date(showDate);
            if (showDate1.getDay() === showDate2.getDay() &&
                showDate1.getMonth() === showDate2.getMonth() &&
                showDate1.getFullYear() === showDate2.getFullYear() &&
                schedule.showTime === showTime &&
                schedule.movieId == movieId) {
                return true;
            }
            return false;

        })
        console.log("movie",movieSchedules)
        if(!movieSchedules){
            res.status(400).json('Movie schedule not found')
        }

        const user = await USER.findById(userId)
        if(!user){
            res.status(400).json('user not found')   
        }
        console.log(user)
        const newBooking = new BOOKING({ 
            userId, 
            showTime, 
            showDate, 
            movieId, 
            theaterId, 
            seat, 
            totalPrice, 
            paymentType })
        await newBooking.save();
        console.log('newBooking done');

        movieSchedules.notAvailableSeats.push(...seat);
         await theater.save();
         console.log('theater saved');
        

         user.bookings.push(newBooking._id);
         await user.save();
         console.log('user saved');
         
         res.status(201).json({ message: "Booking successful"});


    } catch (error) {
        console.log(error)
        res.status(500).json('Internal server error')
    }
}
export {bookingTicket}

