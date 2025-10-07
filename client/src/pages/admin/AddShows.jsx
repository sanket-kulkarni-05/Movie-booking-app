import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import { Star, CheckIcon } from 'lucide-react';
import Loading from '../../components/Loading';

const AddShows = () => {
    const currency = import.meta.env.VITE_CURRENCY;
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [dateTimeSelection, setDateTimeSelection] = useState({});
    const [dateTimeInput, setDateTimeInput] = useState("");
    const [showPrice, setShowPrice] = useState("");

    // Local kConverter function to avoid import issues
    const kConverter = (num) => {
        if(num >= 1000){
            return (num/1000).toFixed(1) + "k"
        } else {
            return num;
        }
    }

    // Local date formatter function
    const formatReleaseDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    const fetchNowPlayingMovies = async() => {
        setNowPlayingMovies(dummyShowsData)
    };

    useEffect(() => {
        setNowPlayingMovies(dummyShowsData);
    }, []);

    return nowPlayingMovies.length > 0 ? (
        <>
        <div className='p-6'>
            <h1 className='text-2xl font-medium mb-6'>
                Add <span className='underline text-primary'>Shows</span>
            </h1>
            <p className="mt-10 text-lg font-medium">Now Playing Movies</p>
            <div className="overflow-x-auto pb-4">
                <div className='group flex flex-wrap gap-4 mt-4 w-max'>
                    {nowPlayingMovies.map((movie) => (
                        <div 
                            key={movie.id} 
                            className={`relative w-44 cursor-pointer 
                                group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300 ${
                                    selectedMovie === movie.id ? 'ring-2 ring-primary' : ''
                                }`
                            } 
                            onClick={() => setSelectedMovie(movie.id)}
                        >
                            <div className="relative rounded-lg overflow-hidden">
                                <img src={movie.poster_path} alt={movie.title} className="w-full h-60 object-cover brightness-90"/>
                                <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                                    <p className="flex items-center gap-1 text-gray-400">
                                        <Star className="w-4 h-4 text-primary fill-primary" />
                                        {movie.vote_average.toFixed(1)}
                                    </p>
                                    <p className="text-gray-300">
                                        {kConverter(movie.vote_count)} Votes
                                    </p>
                                </div>
                            </div>
                            {selectedMovie === movie.id && (
                                <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">
                                    <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                                </div>
                            )}
                            <div className="mt-2 space-y-1">
                                <p className="font-medium text-gray-900 line-clamp-2" title={movie.title}>
                                    {movie.title}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {formatReleaseDate(movie.release_date)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    </>
    ) : <Loading/>
};

export default AddShows;