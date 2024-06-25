import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
   firstName:{
        type : String,
        required :true
   },
   lastName:{
    type : String,
    required :true
   },
   email :{
       type : String,
       unique: true,
       required : true,
   },
   password :{
       type :String,
       required : true
   },
   city :{
    type :String,
    required : true
   },
   role :{
    type : String,
    default : 'user'
   },

bookings: [
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'BOOKING' 
    }],


},{
    timestamps : true
})

const USER = mongoose.model('users',userSchema);
export default USER