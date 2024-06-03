import mongoose from 'mongoose'

const movieSchema = mongoose.Schema({
    title :{
        type :String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    releaseDate : {
        type : Date,
        required : true
    },
    rating: {
        type: Number,
        required: true
    },
    duration :{
        type : Number,
        required : true
    },
    genre :{
        type : String,
        required : true
    }
})

const MOVIE = mongoose.model('movies',movieSchema);
export default MOVIE