import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import {
    FaBuilding,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaMapMarkerAlt,
    FaFilePdf,
} from 'react-icons/fa';

const OrganizationInformation = ({ onComplete }) => {
    const [formData, setFormData] = useState({
        startupName: '',
        dateOfEstablishment: '',
        evaluation: '',
        address: '',
        industry: '',
        website: '',
        pdf: null,
        BusinessType: '',
        country: '', // Add country field
    });

    // State for tracking form validation
    const [isFormComplete, setIsFormComplete] = useState(false);

    // State for sector dropdown visibility and options
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const sectorOptions = [
        'Ayurveda',
        'Yoga and Naturopathy',
        'Unani',
        'Siddha',
        'Homoeopathy',
    ];

    // State for country options
    const [countryOptions, setCountryOptions] = useState([]);

    // Load saved data from localStorage on component mount
    useEffect(() => {
        const savedData = localStorage.getItem('organizationInformation');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }

        // Fetch countries dynamically
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const countries = response.data.map((country) => ({
                    label: country.name.common,
                    value: country.name.common,
                }));
                countries.sort((a, b) => a.label.localeCompare(b.label)); // Sort countries alphabetically
                setCountryOptions(countries);
            } catch (error) {
                console.error('Error fetching country data:', error);
            }
        };

        fetchCountries(); // Fetch countries on component mount
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

    // Handle industry input change
    const handleIndustryChange = (e) => {
        const value = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            industry: value,
        }));
        setIsDropdownVisible(value.trim() !== '');
    };

    // Handle selection from dropdown
    const handleSectorSelect = (sector) => {
        setFormData((prevData) => ({
            ...prevData,
            industry: sector,
        }));
        setIsDropdownVisible(false); // Hide dropdown after selection
    };

    // Validate form completeness
    const validateForm = () => {
        const requiredFields = [
            'startupName',
            'dateOfEstablishment',
            'evaluation',
            'address',
            'industry',
            'BusinessType',
            'country', // Add country to required fields
            'website'
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

                {/* Country Dropdown */}
                <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <div className="w-full relative">
                        <label className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange} // Use handleChange to update formData
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Country</option>
                            {countryOptions.map((country) => (
                                <option key={country.value} value={country.value}>
                                    {country.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Business Type */}
                <div className="flex items-center space-x-3">
                    <FaBuilding className="text-blue-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Type of Business Entity
                        </label>
                        <select
                            name="BusinessType"
                            value={formData.BusinessType} // Bind to BusinessType
                            onChange={handleChange} // Directly use handleChange to update formData
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Business Type</option>
                            <option value="Sole Partnership">Sole Partnership</option>
                            <option value="Partnership">Partnership</option>
                            <option value="Corporation">Corporation (Private or Public)</option>
                            <option value="LLC">Limited Liability Company (LLC)</option>
                            <option value="Nonprofit">Nonprofit</option>
                        </select>
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
                            Address (Headquarter)
                        </label>
                        <textarea
                            name="address"
                            placeholder="Enter complete address"
                            rows="3"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Industry Dropdown */}
                <div className="flex items-center space-x-3">
                    <FaBuilding className="text-blue-500" />
                    <div className="w-full relative">
                        <label className="block text-sm font-medium text-gray-700">
                            Industry
                        </label>
                        <div className="relative">
                            <select
                                name="industry"
                                value={formData.industry}
                                onChange={handleIndustryChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Industry</option>
                                {sectorOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            {/* Dropdown Custom Styling */}
                            {isDropdownVisible && (
                                <div
                                    className="absolute left-0 w-full bg-white border mt-1 rounded-md shadow-lg z-10"
                                    style={{ maxHeight: '200px', overflowY: 'auto' }}
                                >
                                    {sectorOptions.map((sector, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleSectorSelect(sector)}
                                            className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                                        >
                                            {sector}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Website */}
             {/* Website */}
<div className="flex items-center space-x-3">
    <FaBuilding className="text-blue-500" />
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
            Website
        </label>
        <input
            type="url"
            name="website"
            placeholder="Enter website URL"
            value={formData.website}
            onChange={handleChange}
            required // Make the field required
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
                        className={`py-2 px-6 rounded-md font-semibold text-white ${isFormComplete
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
