import React, { useEffect, useState } from 'react';
import { dummyBookingData } from '../../assets/assets';
import dateFormat from '../../lib/dateFormat';
import Loading from '../../components/Loading';

const ListBookings = () => {

    const currency = import.meta.env.VITE_CURRENCY

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllbookings = async() => {
        setBookings(dummyBookingData);
        setIsLoading(false);
    }

    useEffect(() => {
        getAllbookings();
    }, []);

    return !isLoading ? (
        <div className='p-6'>
            <h1 className='text-2xl font-medium mb-6'>
                List <span className='underline text-primary'>Bookings</span>
            </h1>
            <div className="max-w-4xl mt-6 overflow-x-auto">
                <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
                    <thead>
                        <tr className="bg-primary/20 text-left text-white">
                            <th className="p-2 font-medium pl-5">User Name</th>
                            <th className="p-2 font-medium">Movie Name</th>
                            <th className="p-2 font-medium">Show Time</th>
                            <th className="p-2 font-medium">Seats</th>
                            <th className="p-2 font-medium">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-light">
                        {bookings.map((item, index) => (
                            <tr key={index} className="border-b border-primary/20 bg-primary/5 even:bg-primary/10">
                                <td className="p-2 min-w-45 pl-5">{item.user.name}</td>
                                <td className="p-2">{item.show.movie.title}</td>
                                <td className="p-2">{dateFormat(item.show.showDateTime)}</td>
                                <td className="p-2">{item.bookedSeats.join(", ")}</td>
                                <td className="p-2">{currency}{item.show.showPrice * item.bookedSeats.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    ) : <Loading/>
};

export default ListBookings;