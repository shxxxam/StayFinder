import React, { useState } from "react";
import hotelPic from "../../assets/images/hotel.jpg";
import acPic from "../../assets/images/ac.png";
import miniBar from "../../assets/images/mini-bar.png";
import parkingPic from "../../assets/images/parking.png";
import wifiPic from "../../assets/images/wifi.png";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";

const HomePage = () => {
    const [roomSearchResults, setRoomSearchResults] = useState([]);

    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    return (
        <div className="mb-10 bg-gray-50 min-h-screen">
            <header className="relative">
                <img
                    src={hotelPic}
                    alt="Stay Finder"
                    className="w-full h-[60vh] object-cover brightness-85"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
                    <h1 className="text-gray-100 text-5xl md:text-6xl font-bold mb-4">
                        Welcome to <span className="text-teal-400">Stay Finder</span>
                    </h1>
                    <h3 className="text-gray-200 text-lg md:text-2xl">Step into a haven of comfort and care</h3>
                </div>
            </header>

            {/* SEARCH/FIND AVAILABLE ROOM SECTION */}
            <section className="px-4 py-8 md:px-16 lg:px-32">
                <RoomSearch handleSearchResult={handleSearchResult} />
                <RoomResult roomSearchResults={roomSearchResults} />
                <div className="text-center mt-8">
                    <a
                        href="/rooms"
                        className="text-teal-600 text-lg font-medium hover:underline"
                    >
                        View All Rooms
                    </a>
                </div>
            </section>

            {/* SERVICES SECTION */}
            <section className="bg-white px-4 py-12 md:px-16 lg:px-32">
                <h2 className="text-gray-600 text-3xl font-bold text-center mb-12">
                    Services at <span className="text-teal-400">Stay Finder</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Service Cards */}
                    {[
                        { img: acPic, title: "Air Conditioning", desc: "Stay cool and comfortable with in-room air conditioning." },
                        { img: miniBar, title: "Mini Bar", desc: "Enjoy complimentary snacks and beverages in-room." },
                        { img: parkingPic, title: "Parking", desc: "On-site parking available for your convenience." },
                        { img: wifiPic, title: "WiFi", desc: "Stay connected with free high-speed Wi-Fi." },
                    ].map((service, index) => (
                        <div key={index} className="flex flex-col items-center text-center bg-gray-100 p-6 rounded-lg shadow-lg">
                            <img src={service.img} alt={service.title} className="w-16 h-16 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;