import React from 'react';

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

// Data for the startups
const startups = [
    {
        id: 1,
        image: 'https://aatmnirbharsena.org/blog/wp-content/uploads/2020/11/Startup-India-Scheme.jpg',
        title: 'Startup 1',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    {
        id: 2,
        image: 'https://aiia.gov.in/wp-content/uploads/2023/12/Last-Date-31-Jan-2024.png',
        title: 'Startup 2',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    // Add more startup data here...
    // This should be the same data as in the previous Favourite_Startups component
    {
        id: 3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLSjEZ1VQ0hIczoOQ4qoyMx7suYmLJXpaHlg&s',
        title: 'Startup 3',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    {
        id: 4,
        image: 'https://static.investindia.gov.in/s3fs-public/2024-01/Dialogue%20For%20Dynamic%20Change%20Ayush%20Sector%20%26%20Startup%20Roadmap.png',
        title: 'Startup 4',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    {
        id: 5,
        image: 'https://t3.ftcdn.net/jpg/04/90/85/86/360_F_490858673_c9poJOBga9KUVWAWqTUKRePdeA1y6msH.jpg',
        title: 'Startup 5',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    {
        id: 6,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlzLVHUwF-xx3-AiHTWsLrEcnNQXbzVTOVaA&s',
        title: 'Startup 6',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    {
        id: 7,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-TeoCO46WSFaOx1BZdeVjgESNSfX-U3JP-crn8IqvQ6i-Wmq83FkKOEScvgm1Lulxa6Q&usqp=CAU',
        title: 'Startup 7',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    {
        id: 8,
        image: 'https://static.investindia.gov.in/s3fs-public/2024-03/The%20Role%20of%20Government%20Initiatives%20in%20Boosting%20Startups.jpg',
        title: 'Startup 8',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    {
        id: 9,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg39smcdAWyn4TR4j6esGsoSSkGTE1ubWxWbk0306PpNN81wy0rrf9hgB-EKBtE1ED8jU&usqp=CAU',
        title: 'Startup 9',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },

    {
        id: 10,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzqBZ3RPczt4bd-X4A4eLkaioFD5catHYk8Q&s',
        title: 'Startup 10',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    {
        id: 11,
        image: 'https://static.startuptalky.com/2024/04/lifechart-success-story-Startuptalky-1.jpg',
        title: 'Startup 11',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    {
        id: 12,
        image: 'https://www.vibrantayurveda.com.au/wp-content/uploads/2023/09/LOGO-Vibrant-Ay-New-1.png',
        title: 'Startup 12',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    {
        id: 13,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg39smcdAWyn4TR4j6esGsoSSkGTE1ubWxWbk0306PpNN81wy0rrf9hgB-EKBtE1ED8jU&usqp=CAU',
        title: 'Startup 13',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    {
        id: 14,
        image: 'https://5.imimg.com/data5/PO/DZ/NX/SELLER-15538588/bachelor-of-ayurvedic-medicine-and-surgery-course.JPG',
        title: 'Startup 14',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    {
        id: 15,
        image: 'https://img-cdn.thepublive.com/fit-in/640x430/filters:format(webp)/entrackr/media/post_attachments/wp-content/uploads/2023/03/Gynoveda.jpg',
        title: 'Startup 15',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    {
        id: 16,
        image: 'https://static.startuptalky.com/2021/04/findmyhealth-fi-startuptalky.jpg',
        title: 'Startup 16',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    {
        id: 17,
        image: 'https://img-cdn.thepublive.com/fit-in/1200x675/viestories/media/post_attachments/wp-content/uploads/2024/01/Ayurvedic-Startup-T.A.C-Appoints-Sanjiv-Gupta-as-its-Chief-Advisor-.webp',
        title: 'Startup 17',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
    {
        id: 18,
        image: 'https://img-cdn.thepublive.com/filters:format(webp)/viestories/media/post_attachments/wp-content/uploads/2022/04/Aadar-Ayurveda-healthcare-company.jpg',
        title: 'Startup 18',
        description:
            'Startup India is a flagship initiative launched by the Government of India in 2016 to promote innovation, entrepreneurship, and economic growth by nurturing startups. The program aims to create a robust ecosystem for startups through various incentives, such as tax exemptions, funding support, and simplified compliance.',
    },
];

// Main App Component
const Favourite_Startups = () => {
    return (
        <>
            <div className="bg-gray-50 min-h-screen p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Connected Startups Section */}
                    <h1 className="text-xl font-bold text-gray-800 mb-6">
                        Favourite Startups
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {startups.map((startup) => (
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
        </>
    );
};

// Export the startup data for use in other components
Favourite_Startups.startups = startups;

export default Favourite_Startups;
