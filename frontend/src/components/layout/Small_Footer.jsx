import React from 'react';

export default function Small_Footer() {
    return (
        <nav>
            <footer className="bg-white text-blue-500 py-2  bottom-0 w-full">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between px-4 space-y-2 sm:space-y-0 sm:space-x-6">
                    <div className="text-center sm:text-left">
                        © 2024 Your Company Name
                    </div>
                    <div className="flex justify-center sm:justify-end space-x-6">
                        <a href="#" className="underline">
                            Chat Assistance
                        </a>
                        <a href="#" className="underline">
                            Privacy Policy
                        </a>
                        <a href="#" className="underline">
                            Contact Us
                        </a>
                    </div>
                </div>
            </footer>
        </nav>
    );
}
