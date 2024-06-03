const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  movie : {
    type : mongoose.Schema.Types.ObjectId,
    ref : MOVIE,
    required : true
  },
  showTime :{
    type : String,
    required : true
  },
  showDate : {
    type : Date,
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
  paymentId :{
    type :String,
    required : true
  },
  Users:{
   type : mongoose.Schema.Types.ObjectId,
   ref: "USER",
   required : true
  }
});

const Booking= mongoose.model('Booking', BookingSchema);
export default Booking
