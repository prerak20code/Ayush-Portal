import React from 'react';
import { Footer, Header } from '../components';
import Favourite_Startups from '../components/layout/Favourite_Startups';

// Card Component
const Card = ({ image, title, description }) => {
    return (
        <div
            className="bg-gradient-to-b from-orange-300 to-orange-100 rounded-lg shadow-md p-6 transform transition duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:scale-105 hover:cursor-pointer"
            style={{
                perspective: '1000px',
            }}
        >
            {/* Image Section */}
            <img
                src={image}
                alt={title}
                className="w-full h-40 object-cover rounded-md mb-4"
                style={{
                    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                }}
            />
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            {/* Description */}
            <p className="text-sm text-gray-600 mt-2">{description}</p>
        </div>
    );
};

// Main App Component
const ConnectedStartups = () => {
    // Fetch the startups data from Favourite_Startups component (assuming it has a 'startups' export)
    const startups = Favourite_Startups.startups || [];

    // Partitioning startups
    const connectedStartups = startups.slice(0, 18); // First 6 startups

    return (
        <>
            <Header />
            <div className="bg-gray-50 min-h-screen p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Connected Startups Section */}
                    <h1 className="text-xl font-bold text-gray-800 mb-6">
                        Taregted Startups
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {connectedStartups.map((startup) => (
                            <Card
                                key={startup.id}
                                image={startup.image}
                                title={startup.title}
                                description={startup.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ConnectedStartups;
