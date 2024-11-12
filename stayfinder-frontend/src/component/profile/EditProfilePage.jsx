import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleDeleteProfile = async () => {
        if (!window.confirm('Are you sure you want to delete your account?')) {
            return;
        }
        try {
            await ApiService.deleteUser(user.id);
            navigate('/signup');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold text-teal-600 mb-6">Edit Profile</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {user && (
                <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-1/2">
                    <div className="mb-4">
                        <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700"><strong>Phone Number:</strong> {user.phoneNumber}</p>
                    </div>
                    <button
                        onClick={handleDeleteProfile}
                        className="w-auto bg-red-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        Delete Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditProfilePage;
