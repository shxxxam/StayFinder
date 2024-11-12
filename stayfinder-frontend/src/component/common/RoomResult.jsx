import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ApiService from "../../service/ApiService";

const RoomResult = ({ roomSearchResults }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const isAdmin = ApiService.isAdmin();

  return (
    <section className="px-4 py-4 bg-gray-50">
      {roomSearchResults && roomSearchResults.length > 0 && (
        <div className="space-y-4">
          {roomSearchResults.map((room) => (
            <div
              key={room.id}
              className="bg-white shadow-md rounded-md p-4 flex justify-between items-center"
            >
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">{room.roomType}</h3>
                <p className="text-gray-600">Price: ${room.roomPrice} / night</p>
                <p className="text-gray-500 text-sm">{room.roomDescription}</p>
              </div>

              <div className="ml-4">
                {isAdmin ? (
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                    onClick={() => navigate(`/admin/edit-room/${room.id}`)}
                  >
                    Edit Room
                  </button>
                ) : (
                  <button
                    className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition duration-200"
                    onClick={() => navigate(`/room-details-book/${room.id}`)}
                  >
                    View/Book Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RoomResult;
