
import MOVIE from '../model/movieModel.js'

const addMovie = async(req,res)=>{
    console.log('Yes hitted')
    try {
        
        const {movieImg,title,description,releaseDate,rating,duration,genre}=req.body;
        console.log(req.body)
        
        const newMovie = new MOVIE({
            movieImg,
            title,
            description,
            rating,
            releaseDate,
            duration,
            genre
        })
        await newMovie.save()

        res.status(201).json('movie added successfully')
      
    } catch (error) {
        console.log(error);
        res.status(500).json({error : 'Internal server error'})
    }
}

const addCelebtoMovie = async(req,res)=>{
    try {
        const {movieId,celebtype,celebname ,celebrole ,celebimg } = req.body

        const movie = await MOVIE.findById(movieId)

        if(!movie){
            res.status(400).json('Movie not found')
        }
        const newCeleb = new MOVIE({
            celebtype,
            celebname,
            celebrole,
            celebimg
        })
        
        if(celebtype === 'cast'){
            movie.cast.push(newCeleb)
        }else{
            movie.crew.push(newCeleb)
        }

        await movie.save();

        res.status(200).json({message:'Successfully added the movie celebrity',movie})

    } catch (error) {
       console.log(error);
       res.status(500).json('internal server error') 
    }
}

const getMovies = async(req,res)=>{
    try {
        const movies = await MOVIE.find({})
        if(!movies){
            res.status(400).json('Movies not found')
        }
        res.status(200).json(movies)
        
    } catch (error) {
        console.log(error);
        res.status(500).json('internal server error')  
    }
}

const getMovieById =async(req,res)=>{
    try {
       const id = req.params.id 
       const getMovie = await MOVIE.findById(id)
       if(!getMovie){
        res.status(400).json('Not found the movie')
       }
       res.status(200).json(getMovie)
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')
    }
}

const updateMovie =async(req,res)=>{
    try {
    
    const { id } = req.params;
    const movieData = req.body;
        const updatedMovie = await MOVIE.findByIdAndUpdate(id, { $set: movieData }, { new: true});
        if (!updatedMovie) {
            return res.status(404).send({ message: 'Movie not found' });
        }
        res.send(updatedMovie);

        
    } catch (error) {
        console.log(error);
       res.status(500).json('internal server error') 
    }
}

const dltMovie = async(req,res)=>{
    try {
        const id = req.params.id
        const deletedmovie = await MOVIE.findByIdAndDelete(id);
        if(!deletedmovie){
            res.status(400).json('Not found this movie')
        }
        res.status(200).json('successfully deleted')
        
    } catch (error) {
        console.log(error);
        res.status(500).json('internal server error')  
    }
}

export {addMovie,getMovies,getMovieById,addCelebtoMovie,updateMovie,dltMovie}