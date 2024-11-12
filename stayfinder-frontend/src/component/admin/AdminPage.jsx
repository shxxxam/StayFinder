import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';

const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error('Error fetching admin details:', error.message);
            }
        };

        fetchAdminName();
    }, []);

    return (
        <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
            <h1 className="text-3xl font-semibold text-teal-500 mb-6 text-center">
            Greetings, {adminName}
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                    onClick={() => navigate('/admin/manage-rooms')}
                    className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-600 transition duration-200"
                >
                    Manage Rooms
                </button>
                <button
                    onClick={() => navigate('/admin/manage-bookings')}
                    className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-600 transition duration-200"
                >
                    Manage Bookings
                </button>
            </div>
        </div>
    );
}

export default AdminPage;
