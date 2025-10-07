import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import { Star, CheckIcon, X } from 'lucide-react';
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

    const handleDateTimeAdd = () => {
        if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
        if (!date || !time) return;

        setDateTimeSelection(prev => {
        const times = prev[date] || [];
        if (!times.includes(time)) {
            return { ...prev, [date]: [...times, time] };
        }
        return prev;
        });
    };

    const handleRemoveTime = (date, time) => {
        setDateTimeSelection((prev) => {
        const filteredTimes = prev[date].filter((t) => t !== time);
            if (filteredTimes.length === 0) {
                const { [date]: _, ...rest } = prev;
                return rest;
            }
            return {
                ...prev,
                [date]: filteredTimes,
            };
        });
    };

    useEffect(() => {
        setNowPlayingMovies(dummyShowsData);
    }, []);

    return nowPlayingMovies.length > 0 ? (
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

            {/* Show Price Section */}
            <div className="mt-8">
                <label className="block text-sm font-medium mb-2">Show Price</label>
                <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
                    <p className="text-gray-400 text-sm">{currency}</p>
                    <input 
                        min={0} 
                        type="number" 
                        value={showPrice} 
                        onChange={(e) => setShowPrice(e.target.value)} 
                        placeholder="Enter show price" 
                        className="outline-none bg-transparent"
                    />
                </div>
            </div>

            {/* Date and Time Selection */}
            <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Select Date and Time</label>
                <div className="inline-flex gap-2 items-center border border-gray-600 px-3 py-2 rounded-md">
                    <input 
                        type="datetime-local" 
                        value={dateTimeInput} 
                        onChange={(e) => setDateTimeInput(e.target.value)} 
                        className="outline-none bg-transparent text-sm" 
                    />
                    <button 
                        onClick={handleDateTimeAdd} 
                        className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary transition-colors"
                    >
                        Add Time
                    </button>
                </div>
            </div>

            {/* Display Selected Times */}
            {Object.keys(dateTimeSelection).length > 0 && (
                <div className="mt-6">
                    <h2 className="text-lg font-medium mb-4">Selected Show Times</h2>
                    <div className="space-y-3">
                        {Object.entries(dateTimeSelection).map(([date, times]) => (
                            <div key={date} className="border border-gray-300 rounded-lg p-4">
                                <div className="font-medium text-gray-900 mb-2">
                                    {formatReleaseDate(date)}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {times.map((time) => (
                                        <div key={time} className="flex items-center gap-2 bg-primary/10 border border-primary px-3 py-1 rounded-md text-sm">
                                            <span>{time}</span>
                                            <X
                                                onClick={() => handleRemoveTime(date, time)}
                                                size={16}
                                                className="text-red-500 hover:text-red-700 cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Add Show Button - Always visible for testing */}
            <div className="mt-8">
                <button 
                    className="bg-red-500 text-white px-4 py-2 text-sm rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => {
                        console.log("Creating show for movie:", selectedMovie);
                        console.log("Price:", showPrice);
                        console.log("Times:", dateTimeSelection);
                        alert("Show created successfully!");
                    }}
                >
                    Add Show
                </button>
            </div>
        </div>
    ) : <Loading/>
};

export default AddShows;