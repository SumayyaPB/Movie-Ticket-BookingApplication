import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    location:{
        type: String,
        required:true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    },
    role :{
        type:String,
        enum: ['TheaterOwner','Admin']
    }
},{
    timestamps: true
})

const ADMIN = mongoose.model('admin',adminSchema)
export default ADMIN