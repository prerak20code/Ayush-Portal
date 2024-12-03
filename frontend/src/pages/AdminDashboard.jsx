import React, { useState, useEffect } from 'react';
import { Footer, Header } from '../components';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredStartups, setFilteredStartups] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sectorFilter, setSectorFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('desc');

    const sectors = [
        'All',
        'Ayurveda',
        'Yoga and Naturopathy',
        'Unani',
        'Siddha',
        'Homoeopathy',
    ];

    useEffect(() => {
        const fetchStartups = async () => {
            try {
                const dummyData = [
                    {
                        id: 1,
                        name: 'Ayurveda Solutions',
                        sector: 'Ayurveda',
                        registeredDate: '2024-11-28',
                        status: 'Approved',
                    },
                    {
                        id: 2,
                        name: 'Yoga Harmony',
                        sector: 'Yoga and Naturopathy',
                        registeredDate: '2024-11-30',
                        status: 'Pending',
                    },
                    {
                        id: 3,
                        name: 'Unani CureTech',
                        sector: 'Unani',
                        registeredDate: '2024-11-25',
                        status: 'Rejected',
                    },
                    {
                        id: 4,
                        name: 'Startup 1',
                        sector: 'Yoga and Naturopathy',
                        registeredDate: '2023-01-17',
                        status: 'Approved',
                    },
                    {
                        id: 5,
                        name: 'Startup 2',
                        sector: 'Unani',
                        registeredDate: '2023-09-06',
                        status: 'Rejected',
                    },
                    {
                        id: 6,
                        name: 'Homeopathic Health',
                        sector: 'Homoeopathy',
                        registeredDate: '2024-02-27',
                        status: 'Rejected',
                    },
                    {
                        id: 7,
                        name: 'Natural Remedies',
                        sector: 'Ayurveda',
                        registeredDate: '2023-03-31',
                        status: 'Approved',
                    },
                    {
                        id: 8,
                        name: 'Tech Solutions',
                        sector: 'Yoga and Naturopathy',
                        registeredDate: '2023-05-30',
                        status: 'Approved',
                    },
                    {
                        id: 9,
                        name: 'Healing Herbs',
                        sector: 'Siddha',
                        registeredDate: '2023-03-31',
                        status: 'Pending',
                    },
                    {
                        id: 10,
                        name: 'Holistic Health',
                        sector: 'Homoeopathy',
                        registeredDate: '2024-11-14',
                        status: 'Pending',
                    },
                    {
                        id: 11,
                        name: 'Digital Fitness',
                        sector: 'Yoga and Naturopathy',
                        registeredDate: '2023-07-25',
                        status: 'Approved',
                    },
                    {
                        id: 12,
                        name: 'AyurHealth',
                        sector: 'Ayurveda',
                        registeredDate: '2024-05-10',
                        status: 'Rejected',
                    },
                    {
                        id: 13,
                        name: 'Tech Innovations',
                        sector: 'Unani',
                        registeredDate: '2024-06-19',
                        status: 'Approved',
                    },
                    {
                        id: 14,
                        name: 'Siddha Cure',
                        sector: 'Siddha',
                        registeredDate: '2023-08-12',
                        status: 'Pending',
                    },
                    {
                        id: 15,
                        name: 'Bio Solutions',
                        sector: 'Ayurveda',
                        registeredDate: '2024-11-02',
                        status: 'Approved',
                    },
                ];

                await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
                setStartups(dummyData);
                setFilteredStartups(dummyData);
            } catch (error) {
                console.error('Error fetching startups:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStartups();
    }, []);

    useEffect(() => {
        // Filter startups based on sector and search term
        let updatedStartups = startups;

        // Apply sector filter
        if (sectorFilter !== 'All') {
            updatedStartups = updatedStartups.filter(
                (startup) => startup.sector === sectorFilter
            );
        }

        // Apply search filter
        if (searchTerm) {
            updatedStartups = updatedStartups.filter((startup) =>
                startup.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort by date (latest first or oldest based on sortOrder)

        // Sort by ID after applying all filters
        updatedStartups.sort((a, b) => a.id - b.id);

        setFilteredStartups(updatedStartups);
    }, [sectorFilter, searchTerm, startups, sortOrder]);

    const handleSortToggle = () => {
        setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    };

    return (
        <div>
            <Header />

            <div className="min-h-screen bg-gray-100">
                <header className="bg-blue-600 text-white py-6 shadow-md">
                    <div className="container mx-auto px-4 flex justify-between items-center">
                        <h1 className="text-3xl font-bold">
                            Startup's Document Verification Dashboard
                        </h1>
                        <div className="flex gap-4">
                            {/* Search Input */}
                            <input
                                type="text"
                                placeholder="Search startups..."
                                className="px-4 py-2 rounded-md border border-gray-300 text-black"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {/* Filter Dropdown */}
                            <select
                                className="px-4 py-2 rounded-md border border-gray-300 text-black"
                                value={sectorFilter}
                                onChange={(e) =>
                                    setSectorFilter(e.target.value)
                                }
                            >
                                {sectors.map((sector) => (
                                    <option key={sector} value={sector}>
                                        {sector}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Recently Registered Startups
                    </h2>

                    {loading ? (
                        <div className="text-center text-blue-600 font-medium">
                            Loading...
                        </div>
                    ) : (
                        <div className="bg-white shadow rounded-lg">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="text-left px-4 py-2 border">
                                            S.ID
                                        </th>
                                        <th className="text-left px-4 py-2 border">
                                            Startup Name
                                        </th>
                                        <th className="text-left px-4 py-2 border">
                                            Sector
                                        </th>
                                        <th
                                            className="text-left px-4 py-2 border cursor-pointer"
                                            onClick={handleSortToggle}
                                        >
                                            Registered Date{' '}
                                            {sortOrder === 'desc' ? '↓' : '↑'}
                                        </th>
                                        <th className="text-left px-4 py-2 border">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStartups.length > 0 ? (
                                        filteredStartups.map((startup) => (
                                            <tr
                                                key={startup.id}
                                                className="hover:bg-gray-100"
                                            >
                                                <td className="px-4 py-2 border">
                                                    {startup.id}
                                                </td>
                                                <td className="px-4 py-2 border">
                                                    <Link
                                                        to={`/startup/${startup.id}/documents`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {startup.name}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-2 border">
                                                    {startup.sector}
                                                </td>
                                                <td className="px-4 py-2 border">
                                                    {startup.registeredDate}
                                                </td>
                                                <td className="px-4 py-2 border">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-white ${
                                                            startup.status ===
                                                            'Approved'
                                                                ? 'bg-green-500'
                                                                : startup.status ===
                                                                    'Pending'
                                                                  ? 'bg-yellow-500'
                                                                  : 'bg-red-500'
                                                        }`}
                                                    >
                                                        {startup.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center text-gray-500 py-4"
                                            >
                                                No startups found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
}
