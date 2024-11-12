import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import DatePicker from 'react-datepicker';

const RoomDetailsPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalGuests, setTotalGuests] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [roomId]);

  const handleConfirmBooking = () => {
    // Ensure dates and guests are valid
    if (!checkInDate || !checkOutDate || isNaN(numAdults) || numAdults < 1 || isNaN(numChildren) || numChildren < 0) {
      setErrorMessage('Please enter valid booking details.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    const totalDays = Math.round(Math.abs((new Date(checkOutDate) - new Date(checkInDate)) / (24 * 60 * 60 * 1000))) + 1;
    const totalGuests = numAdults + numChildren;
    const totalPrice = roomDetails.roomPrice * totalDays;
    
    setTotalPrice(totalPrice);
    setTotalGuests(totalGuests);
  };

  const acceptBooking = async () => {
    try {
      const booking = {
        checkInDate: checkInDate.toISOString().split('T')[0],
        checkOutDate: checkOutDate.toISOString().split('T')[0],
        numOfAdults: numAdults,
        numOfChildren: numChildren,
      };

      const response = await ApiService.bookRoom(roomId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate('/rooms');
        }, 10000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  if (isLoading) return <p className="text-center mt-6 text-gray-500">Loading room details...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (!roomDetails) return <p className="text-center mt-6 text-gray-500">Room not found.</p>;

  const { roomType, roomPrice, roomPhotoUrl, description, bookings } = roomDetails;

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {showMessage && (
        <p className="text-green-500 font-medium mb-4 text-center">
          Booking successful! Confirmation code: {confirmationCode}.
        </p>
      )}
      {errorMessage && (
        <p className="text-red-500 font-medium mb-4 text-center">
          {errorMessage}
        </p>
      )}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Room Details</h2>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mb-6">
        {roomPhotoUrl && (
          <img src={roomPhotoUrl} alt={roomType} className="rounded-md mb-4 w-full h-48 object-cover" />
        )}
        <div>
          <h3 className="text-xl font-medium text-teal-600">{roomType}</h3>
          <p className="text-gray-600 mb-2">Price: ${roomPrice} / night</p>
          <p className="text-gray-700 mb-4">{description}</p>
        </div>
        {bookings && bookings.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium text-gray-600 mb-2">Existing Bookings:</h3>
            <ul className="space-y-2">
              {bookings.map((booking, index) => (
                <li key={index} className="flex justify-between text-gray-700">
                  <span>Booking {index + 1}:</span>
                  <span>Check-in: {booking.checkInDate} | Out: {booking.checkOutDate}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center w-full max-w-md">
        <button
          className="w-full bg-teal-500 text-white font-medium py-2 rounded-lg hover:bg-teal-600 transition mb-4"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          {showDatePicker ? "Cancel" : "Book Now"}
        </button>
        {showDatePicker && (
          <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <div className="flex flex-col gap-4 mb-4">
              <DatePicker
                className="border border-gray-300 rounded-lg p-2 w-full"
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                selectsStart
                startDate={checkInDate}
                endDate={checkOutDate}
                placeholderText="Check-in Date"
              />
              <DatePicker
                className="border border-gray-300 rounded-lg p-2 w-full"
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                selectsEnd
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={checkInDate}
                placeholderText="Check-out Date"
              />
              <div className="flex justify-between items-center">
                <label className="text-gray-600">Adults:</label>
                <input
                  type="number"
                  min="1"
                  value={numAdults}
                  onChange={(e) => setNumAdults(parseInt(e.target.value))}
                  className="w-16 border border-gray-300 rounded-lg p-2 text-center"
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-gray-600">Children:</label>
                <input
                  type="number"
                  min="0"
                  value={numChildren}
                  onChange={(e) => setNumChildren(parseInt(e.target.value))}
                  className="w-16 border border-gray-300 rounded-lg p-2 text-center"
                />
              </div>
            </div>
            <button
              className="w-full bg-teal-500 text-white font-medium py-2 rounded-lg hover:bg-teal-600 transition"
              onClick={handleConfirmBooking}
            >
              Confirm Booking
            </button>
          </div>
        )}
        {totalPrice > 0 && (
          <div className="bg-gray-200 rounded-lg p-4 w-full mt-4 text-center">
            <p>Total Price: ${totalPrice}</p>
            <p>Total Guests: {totalGuests}</p>
            <button
              className="w-full bg-teal-500 text-white font-medium py-2 mt-4 rounded-lg hover:bg-teal-600 transition"
              onClick={acceptBooking}
            >
              Accept Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetailsPage;
