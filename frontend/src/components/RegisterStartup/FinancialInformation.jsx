import React, { useState, useEffect } from 'react';
import {
    FaDollarSign,
    FaChartLine,
    FaBuilding,
    FaCalendarAlt,
    FaFilePdf,
} from 'react-icons/fa';

const FinancialInformation = ({ onComplete }) => {
    // State for form fields
    const [formData, setFormData] = useState({
        startupName: '',
        revenue: '',
        profitMargin: '',
        fundingReceived: '',
        valuation: '',
        financialYear: '',
        balanceSheet: null, // Optional field for file upload
    });

    // State for tracking form validation
    const [isFormComplete, setIsFormComplete] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    // Validate form completeness
    const validateForm = () => {
        const requiredFields = [
            'startupName',
            'revenue',
            'profitMargin',
            'fundingReceived',
            'valuation',
            'financialYear',
        ];
        const isComplete = requiredFields.every(
            (field) => formData[field]?.trim() !== ''
        );
        setIsFormComplete(isComplete);
    };

    // Call validateForm on every change
    useEffect(() => {
        validateForm();
    }, [formData]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormComplete) {
            console.log('Form submitted successfully!');
            onComplete(); // Notify parent to mark step as complete and move to the next page
        }
    };

    return (
        <div className="p-6 bg-blue-50 rounded-lg shadow-md border border-gray-200">
            {/* Section Title */}
            <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                Financial Information for Startup
            </h2>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Startup Name */}
                <div className="flex items-center space-x-3">
                    <FaBuilding className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Startup Name
                        </label>
                        <input
                            type="text"
                            name="startupName"
                            placeholder="Enter startup name"
                            value={formData.startupName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Revenue */}
                <div className="flex items-center space-x-3">
                    <FaDollarSign className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Annual Revenue (in Crores)
                        </label>
                        <input
                            type="number"
                            name="revenue"
                            placeholder="Enter revenue in crores"
                            value={formData.revenue}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Profit Margin */}
                <div className="flex items-center space-x-3">
                    <FaChartLine className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Profit Margin (%)
                        </label>
                        <input
                            type="number"
                            name="profitMargin"
                            placeholder="Enter profit margin percentage"
                            value={formData.profitMargin}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Funding Received */}
                <div className="flex items-center space-x-3">
                    <FaDollarSign className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Funding Received (in Crores)
                        </label>
                        <input
                            type="number"
                            name="fundingReceived"
                            placeholder="Enter funding received in crores"
                            value={formData.fundingReceived}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Valuation */}
                <div className="flex items-center space-x-3">
                    <FaChartLine className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Current Valuation (in Crores)
                        </label>
                        <input
                            type="number"
                            name="valuation"
                            placeholder="Enter valuation in crores"
                            value={formData.valuation}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Financial Year */}
                <div className="flex items-center space-x-3">
                    <FaCalendarAlt className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Financial Year
                        </label>
                        <input
                            type="text"
                            name="financialYear"
                            placeholder="Enter financial year"
                            value={formData.financialYear}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Balance Sheet Upload */}
                <div className="flex items-center space-x-3">
                    <FaFilePdf className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Upload Balance Sheet (Optional)
                        </label>
                        <input
                            type="file"
                            name="balanceSheet"
                            accept=".pdf"
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className={`py-2 px-6 rounded-md font-semibold text-white ${
                            isFormComplete
                                ? 'bg-blue-500 hover:bg-blue-600'
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!isFormComplete}
                    >
                        Save Financial Information
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FinancialInformation;
