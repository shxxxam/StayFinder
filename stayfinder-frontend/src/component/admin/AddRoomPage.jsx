import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const AddRoomPage = () => {
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState({
    roomType: '',
    roomPrice: '',
    roomDescription: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);
  const [newRoomType, setNewRoomType] = useState(false);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error('Error fetching room types:', error.message);
      }
    };
    fetchRoomTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoomTypeChange = (e) => {
    if (e.target.value === 'new') {
      setNewRoomType(true);
      setRoomDetails((prevState) => ({ ...prevState, roomType: '' }));
    } else {
      setNewRoomType(false);
      setRoomDetails((prevState) => ({ ...prevState, roomType: e.target.value }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const addRoom = async () => {
    if (!roomDetails.roomType || !roomDetails.roomPrice || !roomDetails.roomDescription) {
      setError('All room details must be provided.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    if (!window.confirm('Do you want to add this room?')) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('roomType', roomDetails.roomType);
      formData.append('roomPrice', roomDetails.roomPrice);
      formData.append('roomDescription', roomDetails.roomDescription);

      const result = await ApiService.addRoom(formData);
      if (result.statusCode === 200) {
        setSuccess('Room Added successfully.');
        setTimeout(() => {
          setSuccess('');
          navigate('/admin/manage-rooms');
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Add New Room</h2>
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Room Type</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={roomDetails.roomType}
            onChange={handleRoomTypeChange}
          >
            <option value="">Select a room type</option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
            <option value="new">Other (please specify)</option>
          </select>
          {newRoomType && (
            <input
              type="text"
              name="roomType"
              placeholder="Enter new room type"
              value={roomDetails.roomType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Room Price</label>
          <input
            type="text"
            name="roomPrice"
            value={roomDetails.roomPrice}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Room Description</label>
          <textarea
            name="roomDescription"
            value={roomDetails.roomDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
          ></textarea>
        </div>

        <button
          onClick={addRoom}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-indigo-700 transition-colors duration-200"
        >
          Add Room
        </button>
      </div>
    </div>
  );
};

export default AddRoomPage;
