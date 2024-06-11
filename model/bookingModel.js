

import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
                        
  showTime :{
    type : String,
    required : true
  },
  showDate : {
    type : Date,
    required : true
  },
  movieId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'MOVIE',
    required : true
  },
  theaterId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'THEATER',
    required : true
  },
  seat:[{
        row : {
          type : String ,
          required : true
        },
        columns : {
          type : Number,
          required : true
        },
        seatId :{
          type : String,
          required : true
        },
        amount :{
          type : Number,
          required : true
        }
  }],
  totalPrice :{
    type : String,
    required : true
  },
  paymentType :{
    type :String,
    required : true
  },
  // paymentId :{
  //   type :String,
  //   required : true
  // },
  userId:{
   type : mongoose.Schema.Types.ObjectId,
   ref: "USER",
   required : true
  }
});

const BOOKING= mongoose.model('Booking', BookingSchema);
export default BOOKING
