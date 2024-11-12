import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import RoomResult from '../common/RoomResult';

const ManageRoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await ApiService.getAllRooms();
        setRooms(response.roomList);
        setFilteredRooms(response.roomList);
      } catch (error) {
        console.error('Error fetching rooms:', error.message);
      }
    };

    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error('Error fetching room types:', error.message);
      }
    };

    fetchRooms();
    fetchRoomTypes();
  }, []);

  const handleRoomTypeChange = (e) => {
    const type = e.target.value;
    setSelectedRoomType(type);
    filterRooms(type);
  };

  const filterRooms = (type) => {
    setFilteredRooms(
      type === '' ? rooms : rooms.filter((room) => room.roomType === type)
    );
    setCurrentPage(1);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">All Rooms</h2>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <label className="text-gray-700 font-medium">Filter by Room Type:</label>
          <select 
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring focus:ring-indigo-200 w-full sm:w-auto"
            value={selectedRoomType} 
            onChange={handleRoomTypeChange}
          >
            <option value="">All</option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <button 
          className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-teal-700 transition ease-in-out duration-150"
          onClick={() => navigate('/admin/add-room')}
        >
          Add Room
        </button>
      </div>

      {/* Room Results */}
      <RoomResult roomSearchResults={currentRooms} />

      {/* Pagination */}
      <Pagination
        roomsPerPage={roomsPerPage}
        totalRooms={filteredRooms.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default ManageRoomPage;
