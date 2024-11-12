import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await ApiService.getAllBookings();
                setBookings(response.bookingList);
                setFilteredBookings(response.bookingList);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            }
        };
        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings(searchTerm);
    }, [searchTerm, bookings]);

    const filterBookings = (term) => {
        setFilteredBookings(
            term === ''
                ? bookings
                : bookings.filter((booking) =>
                      booking.bookingConfirmationCode?.toLowerCase().includes(term.toLowerCase())
                  )
        );
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col items-center px-4 py-8 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Bookings</h2>

            <div className="mb-6 w-full md:w-1/2">
                <label className="block text-gray-700 font-medium mb-2">Filter by Booking Number:</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter booking number"
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid gap-4 w-full md:w-3/4">
                {currentBookings.length > 0 ? (
                    currentBookings.map((booking) => (
                        <div key={booking.id} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
                            <p className="text-gray-700 mb-1"><strong>Booking Code:</strong> {booking.bookingConfirmationCode}</p>
                            <p className="text-gray-700 mb-1"><strong>Check In Date:</strong> {booking.checkInDate}</p>
                            <p className="text-gray-700 mb-1"><strong>Check Out Date:</strong> {booking.checkOutDate}</p>
                            <p className="text-gray-700 mb-3"><strong>Total Guests:</strong> {booking.totalNumOfGuest}</p>
                            <button
                                onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
                                className="px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors"
                            >
                                Manage Booking
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No bookings found.</p>
                )}
            </div>

            <Pagination
                roomsPerPage={bookingsPerPage}
                totalRooms={filteredBookings.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default ManageBookingsPage;
