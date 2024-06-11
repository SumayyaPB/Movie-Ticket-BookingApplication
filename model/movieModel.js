import mongoose from 'mongoose'

const movieSchema = mongoose.Schema({
    movieImg :{
       type : String,
       required : true
    },
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
    },
    cast :[{
        celebtype : String,
        celebname : String,
        celebrole : String,
        celebimg : String
    }],
    crew :[{
        celebtype : String,
        celebname : String,
        celebrole : String,
        celebimg : String
    }]
})

const MOVIE = mongoose.model('movies',movieSchema);
export default MOVIE