import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

function Navbar() {
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            ApiService.logout();
            navigate('/home');
        }
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    {/* Mobile Menu Toggle */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-teal-600 hover:text-teal-600 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-600 focus:ring-teal-600"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Branding */}
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 text-3xl font-semibold text-teal-600">Stay Finder</div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-6">
                            <NavLink
                                to="/home"
                                activeClassName="text-teal-600"
                                className="text-gray-800 px-4 py-2 rounded-md text-lg font-medium hover:bg-teal-100 hover:text-teal-600 transition-all duration-300"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/rooms"
                                activeClassName="text-teal-600"
                                className="text-gray-800 px-4 py-2 rounded-md text-lg font-medium hover:bg-teal-100 hover:text-teal-600 transition-all duration-300"
                            >
                                Rooms
                            </NavLink>
                            <NavLink
                                to="/find-booking"
                                activeClassName="text-teal-600"
                                className="text-gray-800 px-4 py-2 rounded-md text-lg font-medium hover:bg-teal-100 hover:text-teal-600 transition-all duration-300"
                            >
                                Find my Booking
                            </NavLink>

                            {isUser && (
                                <NavLink
                                    to="/profile"
                                    activeClassName="text-teal-600"
                                    className="text-gray-800 px-4 py-2 rounded-md text-lg font-medium hover:bg-teal-100 hover:text-teal-600 transition-all duration-300"
                                >
                                    Profile
                                </NavLink>
                            )}
                            {isAdmin && (
                                <NavLink
                                    to="/admin"
                                    activeClassName="text-teal-600"
                                    className="text-gray-800 px-4 py-2 rounded-md text-lg font-medium hover:bg-teal-100 hover:text-teal-600 transition-all duration-300"
                                >
                                    Admin
                                </NavLink>
                            )}

                            {!isAuthenticated && (
                                <>
                                    <NavLink
                                        to="/login"
                                        activeClassName="text-teal-600"
                                        className="text-gray-800 px-4 py-2 rounded-md text-lg font-medium hover:bg-teal-100 hover:text-teal-600 transition-all duration-300"
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        to="/register"
                                        activeClassName="text-teal-600"
                                        className="text-gray-800 px-4 py-2 rounded-md text-lg font-medium hover:bg-teal-100 hover:text-teal-600 transition-all duration-300"
                                    >
                                        Register
                                    </NavLink>
                                </>
                            )}
                            {isAuthenticated && (
                                <button
                                    onClick={handleLogout}
                                    className="bg-teal-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-red-600 hover:text-white border transition-all duration-300"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <NavLink
                            to="/home"
                            activeClassName="text-teal-600"
                            className="text-gray-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-100 hover:text-teal-600 transition-all duration-300"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/rooms"
                            activeClassName="text-teal-600"
                            className="text-gray-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-100 hover:text-teal-600 transition-all duration-300"
                        >
                            Rooms
                        </NavLink>
                        <NavLink
                            to="/find-booking"
                            activeClassName="text-teal-600"
                            className="text-gray-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-100 hover:text-teal-600 transition-all duration-300"
                        >
                            Find my Booking
                        </NavLink>

                        {isUser && (
                            <NavLink
                                to="/profile"
                                activeClassName="text-teal-600"
                                className="text-gray-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-100 hover:text-teal-600 transition-all duration-300"
                            >
                                Profile
                            </NavLink>
                        )}
                        {isAdmin && (
                            <NavLink
                                to="/admin"
                                activeClassName="text-teal-600"
                                className="text-gray-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-100 hover:text-teal-600 transition-all duration-300"
                            >
                                Admin
                            </NavLink>
                        )}

                        {!isAuthenticated && (
                            <>
                                <NavLink
                                    to="/login"
                                    activeClassName="text-teal-600"
                                    className="text-gray-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-100 hover:text-teal-600 transition-all duration-300"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    activeClassName="text-teal-600"
                                    className="text-gray-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-100 hover:text-teal-600 transition-all duration-300"
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                        {isAuthenticated && (
                            <button
                                onClick={handleLogout}
                                className="bg-none text-red-500 px-4 py-2 rounded-md text-lg font-medium hover:bg-red-600 hover:text-white border transition-all duration-300"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
