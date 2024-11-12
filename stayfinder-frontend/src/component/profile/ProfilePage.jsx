import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        ApiService.logout();
        navigate('/home');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            {user && <h2 className="text-2xl font-semibold text-teal-600 mb-4">Welcome, {user.name}!</h2>}
            
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={handleEditProfile}
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
                >
                    Edit Profile
                </button>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Logout
                </button>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {user && (
                <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-1/2 mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">My Profile Details</h3>
                    <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
                    <p className="text-gray-600"><strong>Phone Number:</strong> {user.phoneNumber}</p>
                </div>
            )}

            <div className="w-full sm:w-3/4">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">My Booking History</h3>
                <div className="space-y-4">
                    {user && user.bookings.length > 0 ? (
                        user.bookings.map((booking) => (
                            <div key={booking.id} className="bg-white shadow-sm p-4 rounded-lg">
                                <p className="text-gray-700"><strong>Booking Code:</strong> {booking.bookingConfirmationCode}</p>
                                <p className="text-gray-700"><strong>Check-in Date:</strong> {booking.checkInDate}</p>
                                <p className="text-gray-700"><strong>Check-out Date:</strong> {booking.checkOutDate}</p>
                                <p className="text-gray-700"><strong>Total Guests:</strong> {booking.totalNumOfGuest}</p>
                                <p className="text-gray-700"><strong>Room Type:</strong> {booking.room.roomType}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
