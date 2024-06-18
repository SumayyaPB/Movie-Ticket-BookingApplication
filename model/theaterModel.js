import mongoose from 'mongoose'

const theaterSchema = new mongoose.Schema({

    theaterName:{
          type :String,
        required : true
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
    ], 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ADMIN', // Assuming 'User' is your user model
        required: true
    }
    
    
  
});

const THEATER =  mongoose.model('Theater', theaterSchema);
export default THEATER 