import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditBookingPage = () => {
    const navigate = useNavigate();
    const { bookingCode } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await ApiService.getBookingByConfirmationCode(bookingCode);
                setBookingDetails(response.booking);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchBookingDetails();
    }, [bookingCode]);

    const acheiveBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to Acheive this booking?')) return;

        try {
            const response = await ApiService.cancelBooking(bookingId);
            if (response.statusCode === 200) {
                setSuccessMessage("The booking was Successfully Acheived");
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/admin/manage-bookings');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="flex flex-col items-center py-8 px-4 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Booking Detail</h2>

            {error && <p className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 w-full max-w-md text-center">{error}</p>}
            {success && <p className="bg-green-100 text-green-600 px-4 py-2 rounded mb-4 w-full max-w-md text-center">{success}</p>}

            {bookingDetails && (
                <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Booking Details</h3>
                        <p><strong>Confirmation Code:</strong> {bookingDetails.bookingConfirmationCode}</p>
                        <p><strong>Check-in Date:</strong> {bookingDetails.checkInDate}</p>
                        <p><strong>Check-out Date:</strong> {bookingDetails.checkOutDate}</p>
                        <p><strong>Num Of Adults:</strong> {bookingDetails.numOfAdults}</p>
                        <p><strong>Num Of Children:</strong> {bookingDetails.numOfChildren}</p>
                        <p><strong>Guest Email:</strong> {bookingDetails.guestEmail}</p>
                    </div>

                    <hr className="border-gray-200" />

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Booker Details</h3>
                        <p><strong>Name:</strong> {bookingDetails.user.name}</p>
                        <p><strong>Email:</strong> {bookingDetails.user.email}</p>
                        <p><strong>Phone Number:</strong> {bookingDetails.user.phoneNumber}</p>
                    </div>

                    <hr className="border-gray-200" />

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Room Details</h3>
                        <p><strong>Room Type:</strong> {bookingDetails.room.roomType}</p>
                        <p><strong>Room Price:</strong> ${bookingDetails.room.roomPrice}</p>
                        <p><strong>Room Description:</strong> {bookingDetails.room.roomDescription}</p>
                        {/* Optional room photo */}
                        {/* <img src={bookingDetails.room.roomPhotoUrl} alt="Room" className="mt-4 rounded-lg w-full h-40 object-cover" /> */}
                    </div>

                    <button
                        onClick={() => acheiveBooking(bookingDetails.id)}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Achieve Booking
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditBookingPage;
