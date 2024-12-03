import React, { useState, useEffect } from "react";
import { Footer, Header } from "../components";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredStartups, setFilteredStartups] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sectorFilter, setSectorFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("desc");

    const sectors = ["All", "Ayurveda", "Yoga and Naturopathy", "Unani", "Siddha", "Homoeopathy"];

    useEffect(() => {
        const fetchStartups = async () => {
            try {
                const dummyData = [
                    { id: 1, name: "Ayurveda Solutions", sector: "Ayurveda", registeredDate: "2024-11-28", status: "Approved" },
                    { id: 2, name: "Yoga Harmony", sector: "Yoga and Naturopathy", registeredDate: "2024-11-30", status: "Pending" },
                    { id: 3, name: "Unani CureTech", sector: "Unani", registeredDate: "2024-11-25", status: "Rejected" },
                    { id: 4, name: "Startup 1", sector: "Yoga and Naturopathy", registeredDate: "2023-01-17", status: "Approved" },
                    { id: 5, name: "Startup 2", sector: "Unani", registeredDate: "2023-09-06", status: "Rejected" },
                    { id: 6, name: "Homeopathic Health", sector: "Homoeopathy", registeredDate: "2024-02-27", status: "Rejected" },
                    { id: 7, name: "Natural Remedies", sector: "Ayurveda", registeredDate: "2023-03-31", status: "Approved" },
                    { id: 8, name: "Tech Solutions", sector: "Yoga and Naturopathy", registeredDate: "2023-05-30", status: "Approved" },
                    { id: 9, name: "Healing Herbs", sector: "Siddha", registeredDate: "2023-03-31", status: "Pending" },
                    { id: 10, name: "Holistic Health", sector: "Homoeopathy", registeredDate: "2024-11-14", status: "Pending" },
                    { id: 11, name: "Digital Fitness", sector: "Yoga and Naturopathy", registeredDate: "2023-07-25", status: "Approved" },
                    { id: 12, name: "AyurHealth", sector: "Ayurveda", registeredDate: "2024-05-10", status: "Rejected" },
                    { id: 13, name: "Tech Innovations", sector: "Unani", registeredDate: "2024-06-19", status: "Approved" },
                    { id: 14, name: "Siddha Cure", sector: "Siddha", registeredDate: "2023-08-12", status: "Pending" },
                    { id: 15, name: "Bio Solutions", sector: "Ayurveda", registeredDate: "2024-11-02", status: "Approved" },
                    { id: 16, name: "Ancient Wisdom", sector: "Yoga and Naturopathy", registeredDate: "2023-11-17", status: "Approved" },
                    { id: 17, name: "HealthHub", sector: "Homoeopathy", registeredDate: "2024-12-05", status: "Pending" },
                    { id: 18, name: "Traditional Health", sector: "Unani", registeredDate: "2023-04-15", status: "Approved" },
                    { id: 19, name: "Wellness Innovations", sector: "Siddha", registeredDate: "2024-09-29", status: "Rejected" },
                    { id: 20, name: "Fitness Solutions", sector: "Yoga and Naturopathy", registeredDate: "2024-01-10", status: "Approved" },
                    { id: 21, name: "Green Remedies", sector: "Siddha", registeredDate: "2024-07-30", status: "Pending" },
                    { id: 22, name: "Ayurvedic Insights", sector: "Ayurveda", registeredDate: "2024-08-05", status: "Approved" },
                    { id: 23, name: "Pure Wellness", sector: "Unani", registeredDate: "2023-12-12", status: "Rejected" },
                    { id: 24, name: "Healing Hands", sector: "Homoeopathy", registeredDate: "2024-11-22", status: "Approved" },
                    { id: 25, name: "StartUp Tech", sector: "Yoga and Naturopathy", registeredDate: "2023-09-10", status: "Pending" },
                    { id: 26, name: "Ayurveda Clinic", sector: "Ayurveda", registeredDate: "2023-06-20", status: "Approved" },
                    { id: 27, name: "Siddha Medicines", sector: "Siddha", registeredDate: "2024-04-22", status: "Approved" },
                    { id: 28, name: "Naturopathic Health", sector: "Yoga and Naturopathy", registeredDate: "2023-05-10", status: "Rejected" },
                    { id: 29, name: "Healing Herbs Co.", sector: "Unani", registeredDate: "2024-03-15", status: "Approved" },
                    { id: 30, name: "Ayurveda Ventures", sector: "Ayurveda", registeredDate: "2023-12-19", status: "Rejected" },
                    { id: 31, name: "Natural Life", sector: "Yoga and Naturopathy", registeredDate: "2024-02-25", status: "Approved" },
                    { id: 32, name: "MedTech Solutions", sector: "Siddha", registeredDate: "2024-11-03", status: "Pending" },
                    { id: 33, name: "Pure Wellness Clinic", sector: "Homoeopathy", registeredDate: "2023-08-22", status: "Approved" },
                    { id: 34, name: "Holistic Remedies", sector: "Unani", registeredDate: "2024-10-02", status: "Pending" },
                    { id: 35, name: "Herbal Pathways", sector: "Ayurveda", registeredDate: "2024-07-21", status: "Approved" },
                    { id: 36, name: "Rejuvenation Center", sector: "Yoga and Naturopathy", registeredDate: "2023-03-30", status: "Rejected" },
                    { id: 37, name: "Siddha Care", sector: "Siddha", registeredDate: "2024-12-08", status: "Pending" },
                    { id: 38, name: "Nature's Blessings", sector: "Unani", registeredDate: "2023-11-10", status: "Approved" },
                    { id: 39, name: "Traditional Remedies", sector: "Ayurveda", registeredDate: "2024-09-21", status: "Rejected" },
                    { id: 40, name: "Fitness First", sector: "Yoga and Naturopathy", registeredDate: "2024-04-15", status: "Approved" },
                    { id: 41, name: "Siddha Herbs", sector: "Siddha", registeredDate: "2024-12-01", status: "Pending" },
                    { id: 42, name: "Mindful Health", sector: "Ayurveda", registeredDate: "2023-02-20", status: "Approved" },
                    { id: 43, name: "Naturopathy Insights", sector: "Yoga and Naturopathy", registeredDate: "2024-03-01", status: "Rejected" },
                    { id: 44, name: "Herbal Treatments", sector: "Unani", registeredDate: "2023-04-05", status: "Pending" },
                    { id: 45, name: "Complete Health Solutions", sector: "Homoeopathy", registeredDate: "2024-06-20", status: "Approved" },
                    { id: 46, name: "Natural Healing", sector: "Yoga and Naturopathy", registeredDate: "2023-11-10", status: "Approved" },
                    { id: 47, name: "Ayurvedics", sector: "Ayurveda", registeredDate: "2024-01-01", status: "Rejected" },
                    { id: 48, name: "True Health", sector: "Siddha", registeredDate: "2024-10-29", status: "Approved" },
                    { id: 49, name: "Holistic Meds", sector: "Unani", registeredDate: "2023-12-15", status: "Approved" },
                    { id: 50, name: "Ayurvedic Healing", sector: "Ayurveda", registeredDate: "2024-09-01", status: "Pending" },
                ];

                await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
                setStartups(dummyData);
                setFilteredStartups(dummyData);
            } catch (error) {
                console.error("Error fetching startups:", error);
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
        if (sectorFilter !== "All") {
            updatedStartups = updatedStartups.filter((startup) => startup.sector === sectorFilter);
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
        setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    };

    return (
        <div>
            <Header />

            <div className="min-h-screen bg-gray-100">
                <header className="bg-blue-600 text-white py-6 shadow-md">
                    <div className="container mx-auto px-4 flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Startup's Document Verification Dashboard</h1>
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
                                onChange={(e) => setSectorFilter(e.target.value)}
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
                    <h2 className="text-2xl font-semibold mb-4">Recently Registered Startups</h2>

                    {loading ? (
                        <div className="text-center text-blue-600 font-medium">Loading...</div>
                    ) : (
                        <div className="bg-white shadow rounded-lg">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="text-left px-4 py-2 border">S.ID</th>
                                        <th className="text-left px-4 py-2 border">Startup Name</th>
                                        <th className="text-left px-4 py-2 border">Sector</th>
                                        <th
                                            className="text-left px-4 py-2 border cursor-pointer"
                                            onClick={handleSortToggle}
                                        >
                                            Registered Date {sortOrder === "desc" ? "↓" : "↑"}
                                        </th>
                                        <th className="text-left px-4 py-2 border">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStartups.length > 0 ? (
                                        filteredStartups.map((startup) => (
                                            <tr key={startup.id} className="hover:bg-gray-100">
                                                <td className="px-4 py-2 border">{startup.id}</td>
                                                <td className="px-4 py-2 border">
                                                    <Link
                                                        to={`/startup/${startup.id}/documents`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {startup.name}
                                                    </Link>

                                                </td>
                                                <td className="px-4 py-2 border">{startup.sector}</td>
                                                <td className="px-4 py-2 border">{startup.registeredDate}</td>
                                                <td className="px-4 py-2 border">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-white ${startup.status === "Approved"
                                                            ? "bg-green-500"
                                                            : startup.status === "Pending"
                                                                ? "bg-yellow-500"
                                                                : "bg-red-500"
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
