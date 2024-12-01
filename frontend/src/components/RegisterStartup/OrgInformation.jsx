import React, { useState, useEffect } from 'react';
import {
    FaBuilding,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaMapMarkerAlt,
    FaFilePdf,
} from 'react-icons/fa';

const OrganizationInformation = ({ onComplete }) => {
    // State for form fields
    const [formData, setFormData] = useState({
        startupName: '',
        dateOfEstablishment: '',
        evaluation: '',
        address: '',
        industry: '',
        website: '',
        pdf: null, // Field for uploading PDFs
    });

    // State for tracking form validation
    const [isFormComplete, setIsFormComplete] = useState(false);

    // Load saved data from localStorage on component mount
    useEffect(() => {
        const savedData = localStorage.getItem('organizationInformation');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(
            'organizationInformation',
            JSON.stringify(formData)
        );
    }, [formData]);

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
            'dateOfEstablishment',
            'evaluation',
            'address',
            'industry',
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
                Startup/Organization Information
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

                {/* Date of Establishment */}
                <div className="flex items-center space-x-3">
                    <FaCalendarAlt className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Date of Establishment
                        </label>
                        <input
                            type="date"
                            name="dateOfEstablishment"
                            value={formData.dateOfEstablishment}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Evaluation */}
                <div className="flex items-center space-x-3">
                    <FaMoneyBillWave className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Evaluation (in Crores)
                        </label>
                        <input
                            type="number"
                            name="evaluation"
                            placeholder="Enter evaluation in crores"
                            value={formData.evaluation}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <textarea
                            name="address"
                            placeholder="Enter complete address"
                            rows="3"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                </div>

                {/* Industry */}
                <div className="flex items-center space-x-3">
                    <FaBuilding className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Industry
                        </label>
                        <input
                            type="text"
                            name="industry"
                            placeholder="Enter industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Website */}
                <div className="flex items-center space-x-3">
                    <FaBuilding className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Website (Optional)
                        </label>
                        <input
                            type="url"
                            name="website"
                            placeholder="Enter website URL"
                            value={formData.website}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* PDF Upload */}
                <div className="flex items-center space-x-3">
                    <FaFilePdf className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Upload PDF (Optional)
                        </label>
                        <input
                            type="file"
                            name="pdf"
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
                        Save Information
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrganizationInformation;
