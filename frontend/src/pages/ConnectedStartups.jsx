import Favourite_Startups from '../components/layout/Favourite_Startups';

// Card Component
const Card = ({ image, title, description, showButton }) => {
    return (
        <div
            className="bg-white border border-gray-300 rounded-lg shadow-md p-6 transform transition duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:scale-105 hover:cursor-pointer"
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
            {/* Button */}
            {showButton && (
                <button className="mt-4 bg-orange-500 text-white py-1 px-3 rounded hover:bg-orange-300 flex items-center justify-center mx-auto">
                    View Details
                </button>
            )}
        </div>
    );
};

// Main App Component
export const ConnectedStartups = () => {
    const startups = Favourite_Startups.startups || [];

    // Partitioning startups
    const connectedStartups = startups.slice(0, 6); // First 6 startups
    const trendingStartups = startups.slice(6); // Remaining startups

    return (
        <div className="white min-h-screen p-6 bg-orange-200 ">
            <div className="max-w-6xl mx-auto ">
                {/* Connected Startups Section */}
                <div className="bg-gradient-to-r from-orange-400 to-white rounded-lg p-8 shadow-md mb-12  ">
                    <h1 className="text-4xl font-semibold text-gray-800 mb-8 tracking-wide leading-tight shadow-md font-poppins">
                        Connected Startups
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {connectedStartups.map((startup) => (
                            <Card
                                key={startup.id}
                                image={startup.image}
                                title={startup.title}
                                description={startup.description}
                                showButton={false} // No button for connected startups
                            />
                        ))}
                    </div>
                </div>

                {/* Trending Startups Section */}
                <div className="bg-gradient-to-r from-orange-500 to-white rounded-lg p-8 shadow-md">
                    <h1 className="text-4xl font-semibold text-gray-800 mb-8 tracking-wide leading-tight shadow-md font-poppins">
                        Trending Startups
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trendingStartups.map((startup) => (
                            <Card
                                key={startup.id}
                                image={startup.image}
                                title={startup.title}
                                description={startup.description}
                                showButton={true} // Button only for trending startups
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};