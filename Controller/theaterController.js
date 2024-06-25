import MOVIE from "../model/movieModel.js";
import THEATER from "../model/theaterModel.js";

const addTheater = async (req, res) => {
  console.log(req.body);
  try {
    const { theaterName, seats, location, screenType } = req.body;

    const newTheater = new THEATER({
      theaterName,
      seats,
      location,
      screenType,
      movieSchedules: [],
    });
    await newTheater.save();
    res
      .status(201)
      .json({ message: "successfully added the Theater", newTheater });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

const addMovieScheduletoScreen = async (req, res) => {
  try {
    const { theaterId, movieId, showTime, showDate } = req.body;
    console.log(req.body);
    const theater = await THEATER.findById(theaterId);
    console.log(theaterId);

    if (!theater) {
      res.status(400).json("Theater not found");
    }
    const movie = await MOVIE.findById(movieId);
    if (!movie) {
      res.status(404).json("movie not found");
    }

    theater.movieSchedules.push({
      movieId,
      showTime,
      notAvailableSeats: [],
      showDate,
    });
    await theater.save();
    res
      .status(201)
      .json({ message: "successfully created movie schedules", theater });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

const theaterByCity = async (req, res) => {
  try {
    const location = req.params.city.toLowerCase();
    console.log(location);
    const theater = await THEATER.find({ location });
    console.log(theater);
    if (!theater) {
      res.status(404).json("No theaters found in the specified city");
    }
    // || theater.length === 0
    res.status(200).json(theater);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

  

const theaterByMovieSchedule = async (req, res) => {
  try {
    const location = req.params.city.toLowerCase();
    const date = req.params.date;
    const movieId = req.params.movieId;
    // console.log(city,date,movieId)

    const theaters = await THEATER.find({ location });
    if (!theaters || theaters.length === 0) {
      res.status(404).json("No theaters found in the specified city");
    }

    let temp = [];

    theaters.forEach((theater) => {
      theater.movieSchedules.forEach((schedule) => {
        let showDate = new Date(schedule.showDate);
        let bodyDate = new Date(date);

        if (
          showDate.getDate() === bodyDate.getDate() &&
          showDate.getMonth() === bodyDate.getMonth() &&
          showDate.getFullYear() === bodyDate.getFullYear() &&
          schedule.movieId == movieId
        ) {
          temp.push(theater);
        }
      });
    });
    console.log(temp);
    res.status(200).json({ message: "Theater retreived successfuly", temp });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};
const scheduleByMovie = async (req, res) => {
  try {
    const theaterId = req.params.theaterId;
    const date = req.params.date;
    const movieId = req.params.movieId;
    // console.log(theaterId,date,movieId)

    const theaters = await THEATER.findById(theaterId);
    if (!theaters) {
      res.status(404).json("No theaters found in the specified city");
    }
    if (!theaters.movieSchedules) {
      return res
        .status(404)
        .json("No movie schedules found for the specified theater");
    }

    const movieSchedules = theaters.movieSchedules.filter((schedule) => {
      let showDate = new Date(schedule.showDate);
      let bodyDate = new Date(date);
      if (
        showDate.getDay() === bodyDate.getDay() &&
        showDate.getMonth() === bodyDate.getMonth() &&
        showDate.getFullYear() === bodyDate.getFullYear() &&
        schedule.movieId == movieId
      ) {
        return true;
      }
      return false;
    });
    console.log(movieSchedules);

    if (!movieSchedules) {
      return res.status(404).json("Movie schedule not found");
    }

    res
      .status(200)
      .json({
        message: "Movie schedule retrieved successfully",
        movieSchedules,
        theaters
      });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};
const theatersByUser = async (req,res) => {
  try {
    // Assuming `req.user` contains the authenticated user's data
    const theaters = await THEATER.find({});
    res.json(theaters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const updateTheater = async (req, res) => {
  try {
    const id = req.params.id;
    const theaterData = req.body;
    // console.log(id,theaterData)
    const updatedTheater = await THEATER.findByIdAndUpdate(
      id,
      { $set: theaterData },
      { new: true }
    );
    if (!updatedTheater) {
      return res.status(404).send({ message: "Movie not found" });
    }
    res.send(updatedTheater);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};



const dltTheater = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedtheater = await THEATER.findByIdAndDelete(id);
    if (!deletedtheater) {
      res.status(400).json("Not found this theater");
    }
    res.status(200).json("successfully deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

export {
  addTheater,
  addMovieScheduletoScreen,
  theaterByCity,
  theaterByMovieSchedule,
  scheduleByMovie,
  theatersByUser,
  updateTheater,
  dltTheater,
  
};
