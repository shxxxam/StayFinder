import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import RoomResult from '../common/RoomResult';
import RoomSearch from '../common/RoomSearch';

const AllRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(5);

  const handleSearchResult = (results) => {
    setRooms(results);
    setFilteredRooms(results);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await ApiService.getAllRooms();
        const allRooms = response.roomList;
        setRooms(allRooms);
        setFilteredRooms(allRooms);
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
    setSelectedRoomType(e.target.value);
    filterRooms(e.target.value);
  };

  const filterRooms = (type) => {
    if (type === '') {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) => room.roomType === type);
      setFilteredRooms(filtered);
    }
    setCurrentPage(1);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen text-gray-800">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">All Rooms</h2>

      {/* Filter Section */}
      <div className="w-full max-w-4xl mb-6 flex items-center space-x-4">
        <label className="text-lg font-medium text-gray-700 whitespace-nowrap">Room Type:</label>
        <select
          value={selectedRoomType}
          onChange={handleRoomTypeChange}
          className="w-48 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">All</option>
          {roomTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Search Panel */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
        <RoomSearch handleSearchResult={handleSearchResult} />
      </div>

      {/* Room Results */}
      <div className="w-full max-w-5xl mb-6">
        <RoomResult roomSearchResults={currentRooms} />
      </div>

      {/* Pagination */}
      <div className="w-full max-w-3xl">
        <Pagination
          roomsPerPage={roomsPerPage}
          totalRooms={filteredRooms.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default AllRoomsPage;
