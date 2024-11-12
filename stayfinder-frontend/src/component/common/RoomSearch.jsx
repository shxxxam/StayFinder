import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiService from '../../service/ApiService';

const RoomSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error('Error fetching room types: ', error.message);
      }
    };
    fetchRoomTypes();
  }, []);

  // Error handling
  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, timeout);
  };

  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !roomType) {
      showError('Please select all fields');
      return false;
    }
    try {
      const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
      const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
      const response = await ApiService.getAvailableRoomsByDateAndType(formattedStartDate, formattedEndDate, roomType);

      if (response.statusCode === 200) {
        if (response.roomList.length === 0) {
          showError('Room not currently available for this date range on the selected room type.');
          return;
        }
        handleSearchResult(response.roomList);
        setError('');
      }
    } catch (error) {
      showError("Unknown error occurred: " + error.response.data.message);
    }
  };

  return (
    <section className="bg-white p-8 rounded-lg shadow-md my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-2">Check-in Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-in Date"
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-2">Check-out Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-out Date"
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-2">Room Type</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option disabled value="">
              Select Room Type
            </option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleInternalSearch}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          >
            Search Rooms
          </button>
        </div>
      </div>
      {error && (
        <p className="mt-4 text-red-600 font-medium text-sm text-center">
          {error}
        </p>
      )}
    </section>
  );
};

export default RoomSearch;
