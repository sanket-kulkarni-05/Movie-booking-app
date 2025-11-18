import axios from 'axios';
import Movie from '../models/Movie.js';
import Show from '../models/Show.js';
export const getNowPlayingMovies = async (req, res) => {
    try{
        const {data} = await axios.get('https://api.themoviedb.org/3/movie/now_playing',{
            headers:{ Authorization: `Bearer ${process.env.TMDB_API_KEY}`}
        })

        const movies =data.results;
        res.json({success:true, movies});
    }catch(error){
        console.error(error);
        res.json({success:false, message: error.message});
    }
}

export const addShow = async(req,res)=>{
    try{
        const {movieId, showsInput, showPrice} = req.body;

        let movie= await MovieCard.findbyId(movieId)
       if (!movie) {
  // Fetch movie details and credits from TMDB API
        const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
            }),

            axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, { // The URL for the second request is incomplete/missing in the image
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
                })
            ])

            const movieApiData = movieDetailsResponse.data;
            const movieCreditsData = movieCreditsResponse.data;

            const movieDetails={
                _id:movieId,
                title:movieApiData.title,
                overview:movieApiData.overview,
                poster_path:movieApiData.poster_path,
                backdrop_path:movieApiData.backdrop_path,
                geners:movieApiData.genres,
                casts:movieCreditsData.cast,
                release_date:movieApiData.release_date,
                original_language:movieApiData.original_language,
                tagline:movieApiData.tagline || "",
                vote_average:movieApiData.vote_average,
                runtime:movieApiData.runtime

            }

            movie = await Movie.create(movieDetails);
        }

        const showsToCreate = [];
        showsInput.forEach(show => {
            const showDate = show.date;
            show.time.forEach((time) => {
                const dateTimeString = `${showDate}T${time}`;
                showsToCreate.push({
                movie: movieId,
                showDateTime: new Date(dateTimeString),
                showPrice,
                occupiedSeats: {}
                });
            });
        });

        if(showsToCreate.length>0){
            await Show.insertMany(showsToCreate);
        }
        res.json({success: false, message: "show added successfully"})
    }catch(error){
        console.error(error);
        res.json({success: false, message: error.message})

    }
}

//api to get all showos 
// API to get all shows from the database
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } }).populate('movie').sort({ showDateTime: 1 });

    // filter unique shows
    const uniqueShows = new Set(shows.map(show => show.movie));

    res.json({ success: true, shows: Array.from(uniqueShows) });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// // API to get a single show from the database