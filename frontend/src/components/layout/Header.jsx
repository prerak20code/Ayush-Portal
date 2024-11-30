import AYUSHLOGO from '../../assets/images/ayushLogo.png';
import GOVINDIAIMAGE from '../../assets/images/govIndiaLogo.png';
import { icons } from '../../assets/icons';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [showDropdown, setShowDropdown] = useState(false);

    // Close dropdown on screen resize
    useEffect(() => {
        const handleResize = () => setShowDropdown(false);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: 'easeOut' },
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.2, ease: 'easeIn' },
        },
    };

    const tabs = [
        { url: '', name: 'Home' },
        { url: 'register', name: 'Register Now' },
        { url: 'login', name: 'Login' },
        { url: 'track-application', name: 'Track your Application' },
        { url: 'faqs', name: 'FAQs' },
        { url: 'about-us', name: 'About Us' },
    ];

    const tabElements = tabs.map((tab) => (
        <NavLink
            to={tab.url}
            end
            key={tab.name}
            className={({ isActive }) =>
                `${isActive && 'underline'} hover:underline text-[#f9f9f9] font-medium text-md`
            }
        >
            {tab.name}
        </NavLink>
    ));

    const hamburgurElements = tabs.map((tab) => (
        <NavLink
            to={tab.url}
            end
            key={tab.name}
            className={({ isActive }) =>
                `hover:bg-[#f68533] hover:text-[#ffffff] px-2 py-[5px] text-[#040606] font-medium text-md rounded-md ${
                    isActive && 'bg-[#f68533] text-white'
                }`
            }
        >
            {tab.name}
        </NavLink>
    ));

    return (
        <div className="h-[110px]">
            <div className="overflow-x-scroll drop-shadow-md h-[70px] bg-[#f9f9f9] flex items-center justify-between w-full px-2 sm:px-4 py-[5px]">
                <img
                    src={GOVINDIAIMAGE}
                    alt="gov india image"
                    className="object-contain h-[70%] sm:h-full"
                />
                <img
                    src={AYUSHLOGO}
                    alt="ayush logo"
                    className="object-contain rounded-full size-[50px] sm:size-[60px]"
                />
            </div>
            <div className="relative drop-shadow-md bg-[#f68533] flex items-center justify-end h-[40px] gap-x-8 px-4">
                {/* Tabs */}
                <div className="hidden h-full md:flex items-center justify-end gap-x-8">
                    {tabElements}
                </div>

                {/* Icons */}
                <div className="flex items-center justify-end gap-x-6">
                    <div className="size-[20px] fill-[#f9f9f9]">
                        {icons.search}
                    </div>
                    <div
                        className="md:hidden size-[20px] fill-[#f9f9f9] cursor-pointer"
                        onClick={() => setShowDropdown((prev) => !prev)}
                    >
                        {icons.hamburgur}
                    </div>
                </div>

                {/* Hamburger Dropdown */}
                <AnimatePresence>
                    {showDropdown && (
                        <motion.div
                            className="absolute top-[40px] right-2 bg-[#f9f9f9] rounded-xl py-3 flex flex-col items-start justify-start drop-shadow-md"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                        >
                            {/* Pointing Tip */}
                            <div className="absolute -top-[7px] right-[10px] rounded-tl-sm size-4 bg-[#f9f9f9] rotate-45"></div>
                            {/* Dropdown Items */}
                            <div className="flex flex-col gap-y-1 px-2">
                                {hamburgurElements}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
