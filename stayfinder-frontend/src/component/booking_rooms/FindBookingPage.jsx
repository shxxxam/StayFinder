import React, { useState } from "react";
import ApiService from "../../service/ApiService";

const FindBookingPage = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!confirmationCode.trim()) {
      setError("Please enter a booking confirmation code");
      setTimeout(() => setError(""), 5000);
      return;
    }
    try {
      const response = await ApiService.getBookingByConfirmationCode(
        confirmationCode
      );
      setBookingDetails(response.booking);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Find Booking</h2>

      <div className="w-full max-w-lg flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
        <input
          required
          type="text"
          placeholder="Enter your booking confirmation code"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
        >
          Find
        </button>
        {error && <p className="text-red-600 font-medium mt-4">{error}</p>}
      </div>

      {bookingDetails && (
        <div className="w-full max-w-lg mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Booking Details</h3>
          <p className="text-gray-700"><span className="font-medium">Confirmation Code:</span> {bookingDetails.bookingConfirmationCode}</p>
          <p className="text-gray-700"><span className="font-medium">Check-in Date:</span> {bookingDetails.checkInDate}</p>
          <p className="text-gray-700"><span className="font-medium">Check-out Date:</span> {bookingDetails.checkOutDate}</p>
          <p className="text-gray-700"><span className="font-medium">Num Of Adults:</span> {bookingDetails.numOfAdults}</p>
          <p className="text-gray-700"><span className="font-medium">Num Of Children:</span> {bookingDetails.numOfChildren}</p>

          <div className="my-6 border-t border-gray-200" />

          <h3 className="text-xl font-semibold mb-4 text-gray-800">Booker Details</h3>
          <p className="text-gray-700"><span className="font-medium">Name:</span> {bookingDetails.user.name}</p>
          <p className="text-gray-700"><span className="font-medium">Email:</span> {bookingDetails.user.email}</p>
          <p className="text-gray-700"><span className="font-medium">Phone Number:</span> {bookingDetails.user.phoneNumber}</p>

          <div className="my-6 border-t border-gray-200" />

          <h3 className="text-xl font-semibold mb-4 text-gray-800">Room Details</h3>
          <p className="text-gray-700"><span className="font-medium">Room Type:</span> {bookingDetails.room.roomType}</p>
          {/* Uncomment the image below if you have a room photo URL */}
          {/* <img src={bookingDetails.room.roomPhotoUrl} alt="Room Photo" className="w-full h-48 rounded-md object-cover mt-2" /> */}
        </div>
      )}
    </div>
  );
};

export default FindBookingPage;
