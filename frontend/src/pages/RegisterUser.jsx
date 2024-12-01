import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import AyushMinistry from '../assets/images/AyushMinistry.png';
import { Header } from '../components';
import Small_Footer from '../components/layout/Small_Footer';

export default function RegisterUser() {
    // States for form inputs
    const [userId, setUserId] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Create user object
        const userData = {
            userId,
            emailId,
            password,
            phone,
        };

        // Log or send user data to API
        console.log('User Data:', userData);

        // Clear form (optional)
        setUserId('');
        setEmailId('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
        alert('Registration successful Please verify your email');
    };

    return (
        <>
            <Header />
            <div className="flex   items-center justify-center  ">
                {/* Wrapper Div */}
                <div className="flex  flex-col sm:mt-[4vh] sm:flex-row  bg-gray-100 shadow-md rounded-md overflow-hidden max-w-4xl w-full ">
                    {/* Header Section */}
                    <div className="flex-1 bg-white  flex flex-col justify-center items-center p-8 ">
                        {/* 'md:block hidden' ensures it is hidden on smaller screens */}
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">
                            Ayush Startup
                        </h2>
                        <h3 className="text-xl font-semibold text-gray-600 mb-4">
                            User Registration Portal
                        </h3>
                        <img
                            src={AyushMinistry}
                            alt="Ayush Logo"
                            className="max-w-xs w-full max-sm:hidden"
                        />
                    </div>

                    {/* Form Section */}
                    <div className="flex-1  p-8">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* User ID */}
                            <div>
                                <label
                                    htmlFor="userId"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    User Id
                                </label>
                                <input
                                    id="userId"
                                    type="text"
                                    placeholder="Enter User Id"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="userEmail"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    E-mail
                                </label>
                                <input
                                    id="userEmail"
                                    type="email"
                                    placeholder="Enter Email"
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="userPassword"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <input
                                    id="userPassword"
                                    type="password"
                                    placeholder="Enter Password"
                                    minLength={8}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="userConfirmPassword"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="userConfirmPassword"
                                    type="password"
                                    placeholder="Re-enter Password"
                                    minLength={8}
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label
                                    htmlFor="userPhoneNumber"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Phone Number
                                </label>
                                <PhoneInput
                                    country="in"
                                    value={phone}
                                    onChange={(value) => setPhone(value)}
                                    inputClass="!w-full !border !border-gray-300 !rounded-md !shadow-sm focus:!ring-blue-500 focus:!border-blue-500 sm:!text-sm"
                                />
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#f68533] text-white font-medium py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                        <div className="mt-3">
                            <label htmlFor="loginref">
                                Already have an account?
                            </label>{' '}
                            &nbsp;
                            <a
                                id="loginref"
                                href="/Login"
                                className="underline"
                            >
                                Login
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Small_Footer />
        </>
    );
}
