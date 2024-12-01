import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; // Import react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import the default styles
import {
    FaUser,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaLinkedin,
} from 'react-icons/fa';
import Select from 'react-select'; // React Select for nationality dropdown
import validator from 'validator'; // For email validation
import { countries } from 'countries-list'; // Get country data from the package
import { debounce } from 'lodash'; // Debounce utility to prevent unnecessary filtering

const PersonalInformation = ({ data = {}, onComplete }) => {
    // Get all countries from the countries-list package
    const countryList = Object.values(countries).map((country) => ({
        value: country.alpha2,
        label: country.name,
    }));

    // State for form fields
    const [formData, setFormData] = useState({
        fullName: data.fullName || '',
        phoneNumber: data.phoneNumber || '',
        email: data.email || '',
        address: data.address || '',
        dateOfBirth: data.dateOfBirth || '',
        nationality: data.nationality || '', // Initially empty
        linkedIn: data.linkedIn || '',
        photo: data.photo || null, // Optional field
    });

    // State for tracking form validation
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [nationalityInput, setNationalityInput] = useState(''); // For tracking nationality input

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleDateChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            dateOfBirth: date ? date.toISOString().split('T')[0] : '', // Store in YYYY-MM-DD format
        }));
    };

    // Handle nationality change from select
    const handleNationalityChange = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            nationality: selectedOption ? selectedOption.value : '', // Make sure value is correctly updated
        }));
    };

    // Validate form completeness
    const validateForm = () => {
        const requiredFields = [
            'fullName',
            'phoneNumber',
            'email',
            'address',
            'dateOfBirth',
            'nationality',
        ];
        const isComplete =
            requiredFields.every((field) => formData[field]?.trim() !== '') &&
            validator.isEmail(formData.email) &&
            validateEmailDomain(formData.email);

        setIsFormComplete(isComplete);
    };

    // Custom email domain validation
    const validateEmailDomain = (email) => {
        // Check if email ends with popular domains like gmail.com or email.com
        const validDomains = [
            'gmail.com',
            'email.com',
            'outlook.com',
            'yahoo.com',
        ];
        return validDomains.some((domain) => email.endsWith(domain));
    };

    // Call validateForm on every change
    useEffect(() => {
        validateForm();
    }, [formData]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormComplete) {
            // Pass the completed data back to the parent component
            onComplete(formData);
        } else {
            alert(
                'Please complete all required fields and ensure email is valid.'
            );
        }
    };

    // Debounce the nationality input to avoid excessive filtering
    const debouncedInputChange = debounce((inputValue) => {
        setNationalityInput(inputValue);
    }, 300); // 300ms debounce time

    return (
        <div className="p-6 bg-orange-50 rounded-lg shadow-md border border-gray-200">
            {/* Section Title */}
            <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
                Founder/Co-Founder Personal Information
            </h2>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="flex items-center space-x-3">
                    <FaUser className="text-orange-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-center space-x-3">
                    <FaPhone className="text-orange-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Enter phone number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-orange-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-orange-500" />
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
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        ></textarea>
                    </div>
                </div>

                {/* Date of Birth */}
                <div className="flex items-center space-x-3">
                    <FaCalendarAlt className="text-orange-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Date of Birth
                        </label>
                        <DatePicker
                            selected={
                                formData.dateOfBirth
                                    ? new Date(formData.dateOfBirth)
                                    : null
                            }
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            placeholderText="Select your date of birth"
                            required
                        />
                    </div>
                </div>

                {/* Nationality */}
                <div className="flex items-center space-x-3">
                    <FaUser className="text-orange-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            Nationality
                        </label>
                        <Select
                            key={formData.nationality} // Force re-render when nationality changes
                            options={countryList}
                            value={
                                countryList.find(
                                    (option) =>
                                        option.value === formData.nationality
                                ) || null
                            } // Ensure correct value
                            onChange={handleNationalityChange}
                            onInputChange={debouncedInputChange}
                            placeholder="Select your nationality"
                            required
                            isClearable={false}
                            filterOption={(candidate, input) =>
                                candidate.label
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            className="mt-1"
                        />
                    </div>
                </div>

                {/* LinkedIn Profile */}
                <div className="flex items-center space-x-3">
                    <FaLinkedin className="text-orange-500" />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700">
                            LinkedIn Profile (Optional)
                        </label>
                        <input
                            type="url"
                            name="linkedIn"
                            placeholder="Enter LinkedIn profile URL"
                            value={formData.linkedIn}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className={`py-2 px-6 rounded-md font-semibold text-white ${
                            isFormComplete
                                ? 'bg-orange-500 hover:bg-orange-600'
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

export default PersonalInformation;
