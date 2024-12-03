import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function DocumentsUpload() {
    const { id } = useParams();
    const [documents, setDocuments] = useState([]);
    const [startupInfo, setStartupInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStartupData = async () => {
            try {
                // Simulated startup-specific data
                const dummyStartups = {
                    1: {
                        name: "Ayurveda Solutions",
                        headquarters: "Pune, India",
                        valuation: "$2M",
                        sector: "Ayurveda",
                        documents: [
                            { id: 1, name: "Business_Plan_Ayurveda.pdf", type: "PDF", size: "2 MB" },
                            { id: 2, name: "License_Cert.pdf", type: "PDF", size: "1.2 MB" },
                        ],
                    },
                    2: {
                        name: "Yoga Harmony",
                        headquarters: "Bangalore, India",
                        valuation: "$1.5M",
                        sector: "Yoga and Naturopathy",
                        documents: [
                            { id: 3, name: "Yoga_Naturopathy_Report.pdf", type: "PDF", size: "3.5 MB" },
                        ],
                    },
                    3: {
                        name: "Unani CureTech",
                        headquarters: "Hyderabad, India",
                        valuation: "$800K",
                        sector: "Unani",
                        documents: [],
                    },
                    4: {
                        name: "Startup 1",
                        headquarters: "Mumbai, India",
                        valuation: "$5M",
                        sector: "Tech",
                        documents: [
                            { id: 4, name: "Startup_1_Financials.pdf", type: "PDF", size: "4.2 MB" },
                            { id: 5, name: "Startup_1_LegalDocs.pdf", type: "PDF", size: "2.8 MB" },
                        ],
                    },
                };

                await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API delay
                const startupData = dummyStartups[id] || null;
                setStartupInfo(startupData);
                setDocuments(startupData ? startupData.documents : []);
            } catch (error) {
                console.error("Error fetching startup data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStartupData();
    }, [id]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
            <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 shadow-lg">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Startup Documents</h1>
                    <Link
                        to="/AdminDashboard"
                        className="text-white bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {loading ? (
                    <div className="text-center text-blue-600 font-medium text-lg">
                        Loading startup details...
                    </div>
                ) : startupInfo ? (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            {startupInfo.name}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    Headquarters
                                </h3>
                                <p className="text-gray-600">
                                    {startupInfo.headquarters}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    Valuation
                                </h3>
                                <p className="text-gray-600">{startupInfo.valuation}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    Sector
                                </h3>
                                <p className="text-gray-600">{startupInfo.sector}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Uploaded Documents
                            </h3>
                            {documents.length > 0 ? (
                                <ul>
                                    {documents.map((doc) => (
                                        <li
                                            key={doc.id}
                                            className="border-b py-3 flex justify-between items-center"
                                        >
                                            <div>
                                                <p className="text-gray-800 font-medium">
                                                    {doc.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {doc.type} - {doc.size}
                                                </p>
                                            </div>
                                            <button className="text-blue-600 underline hover:text-blue-800">
                                                Download
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">
                                    No documents uploaded for this startup.
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-red-500 font-medium">
                        Startup not found.
                    </div>
                )}
            </main>
        </div>
    );
}
