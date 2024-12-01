import React, { useEffect } from 'react';

const PersonalInformation = ({ formData, handleChange, validateStep }) => {
    useEffect(() => {
        const isValid =
            (formData.firstName || '').trim() &&
            (formData.lastName || '').trim() &&
            (formData.email || '').trim() &&
            (formData.phoneNumber || '').trim() &&
            (formData.dob || '').trim() &&
            (formData.nationalID || '').trim() &&
            (formData.governmentID || '').trim() &&
            (formData.address || '').trim();
        validateStep(isValid);
    }, [formData, validateStep]);

    return (
        <div>
            <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName || ''}
                            onChange={handleChange}
                            placeholder="Enter your First Name"
                            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName || ''}
                            onChange={handleChange}
                            placeholder="Enter your Last Name"
                            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                </div>
                {/* Other fields */}
                {/* Repeat the same for all fields like Email, Phone Number, etc. */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your Email"
                        className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your Phone Number"
                        className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>

                {/* National ID/Passport Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        National ID / Passport Number
                    </label>
                    <input
                        type="text"
                        name="nationalID"
                        value={formData.nationalID}
                        onChange={handleChange}
                        placeholder="Enter your National ID or Passport Number"
                        className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>

                {/* Government ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Government ID
                    </label>
                    <input
                        type="text"
                        name="governmentID"
                        value={formData.governmentID}
                        onChange={handleChange}
                        placeholder="Enter your Government ID"
                        className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Address
                    </label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your Address"
                        className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>
            </form>
        </div>
    );
};

export default PersonalInformation;
