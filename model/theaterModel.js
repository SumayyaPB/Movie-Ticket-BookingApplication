import mongoose from 'mongoose'

const theaterSchema = new mongoose.Schema({
    name : {
        type :String,
        required : true
    },
    location:{
        type : String,
        required :true
    },
    seats:{
        type : Array,
        required : true
    },
    city :{
        type : String,
        required : true
    },
    screenType :{
        type :String,
        required : true
    },
    movieSchedules:[
        {
            movieId:{
                type : mongoose.Schema.Types.ObjectId,
                ref: 'MOVIE',
                required : true
            },
            showTime : String,
            notAvailableSeats :[
                // row  columns seatId amount 
                {
                    row : String,
                    columns : Number,
                    seatId : String,
                    amount : Number

                }],
            showDate : Date
        }
    ] 

    
    
  
});

const THEATER =  mongoose.model('Theater', ShowtimeSchema);
export default THEATER 