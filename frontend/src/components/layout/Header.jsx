import { AYUSHLOGO, GOVINDIAIMAGE } from '../../assets/images';
import { icons } from '../../assets/icons';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Popup } from '..';
import { motion, AnimatePresence } from 'framer-motion';
import {
    useProfileDropdownContext,
    useUserContext,
    useVariantContext,
    // usePopupContext,
} from '../../contexts';
import { userService } from '../../services';

export default function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const { dropdownVariants } = useVariantContext();
    const { showProfileDropdown, setShowProfileDropdown } =
        useProfileDropdownContext();
    const location = useLocation();
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [resetMessage, setResetMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Close dropdown
    useEffect(() => {
        const handleResize = () => {
            setShowDropdown(false);
            setShowProfileDropdown(false);
        };
        // Listen for window resize
        window.addEventListener('resize', handleResize);

        // Close dropdown when location changes
        setShowDropdown(false);
        setShowProfileDropdown(false);
        return () => window.removeEventListener('resize', handleResize);
    }, [location]);

    const tabs = [
        { url: '', name: 'Home', show: true },
        { url: 'register', name: 'Register Now', show: !user },
        {
            url: `${user?._id}/become-investor`,
            name: 'Become an Investor',
            show: user,
        },
        {
            url: `${user?._id}/register-startup`,
            name: 'Register your Startup',
            show: user,
        },
        { url: 'login', name: 'Login', show: !user },
        { url: 'faqs', name: 'FAQs', show: true },
        { url: 'about-us', name: 'About Us', show: true },
        { url: 'contact-us', name: 'Contact Us', show: true },
    ];

    const tabElements = tabs.map(
        (tab) =>
            tab.show && (
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
            )
    );

    const hamburgurElements = tabs.map(
        (tab) =>
            tab.show && (
                <NavLink
                    to={tab.url}
                    end
                    key={tab.name}
                    className={({ isActive }) =>
                        `hover:bg-[#f68533] hover:text-[#ffffff] pl-3 pr-8 py-[5px] text-[#040606] font-medium text-md rounded-md ${
                            isActive && 'bg-[#f68533] text-white'
                        }`
                    }
                >
                    {tab.name}
                </NavLink>
            )
    );

    const profileItems = [
        { path: '/profile', name: 'My Profile' },
        {
            path: `/applications/${user?._id}`,
            name: 'Track your Applications',
        },
        {
            path: `/invested-startups/${user?._id}`,
            name: 'Invested Startups',
        },
        {
            onClick: handleRequestResetPassword,
            name: 'Reset Password',
        },
    ];

    const profileElements = profileItems.map((item) =>
        item.path ? (
            <NavLink
                key={item.name}
                className={({ isActive }) =>
                    `hover:bg-[#f68533] hover:text-[#ffffff] px-2 py-[5px] text-[#040606] font-medium text-md rounded-md ${
                        isActive && 'bg-[#f68533] text-white'
                    }`
                }
                to={item.path}
            >
                {item.name}
            </NavLink>
        ) : (
            <div
                key={item.name}
                onClick={item.onClick}
                className="cursor-pointer hover:bg-[#f68533] hover:text-[#ffffff] px-2 py-[5px] text-[#040606] font-medium text-md rounded-md"
            >
                {item.name}
            </div>
        )
    );

    async function handleLogout() {
        try {
            const res = await userService.logout();
            if (res && res.message === 'user logged out successfully') {
                setUser(null);
                setShowProfileDropdown(false);
                navigate('/');
            }
        } catch (err) {
            navigate('/server-error');
        }
    }

    async function handleDelete() {
        try {
            setShowDeletePopup(true);
            const res = await userService.delete();
            if (res && res.message === 'user account deleted successfully') {
                setUser(null);
                setShowProfileDropdown(false);
                navigate('/');
            }
        } catch (err) {
            navigate('/server-error');
        }
    }

    async function handleRequestResetPassword() {
        try {
            setShowPopup(true);
            setShowProfileDropdown(false);
            setLoading(true);
            const res = await userService.requestResetPassword(user.email);
            if (res?.message === 'password reset email sent') {
                setResetMessage();
            } else {
                setResetMessage(res?.message);
            }
        } catch (err) {
            navigate('/server-error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-[110px]">
            {/* logo header */}
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

            {/* tabs header */}
            <div className="relative drop-shadow-md bg-[#f68533] flex items-center justify-end h-[40px] gap-x-8 px-4">
                {/* Tabs */}
                <div className="hidden h-full md:flex items-center justify-end gap-x-8">
                    {tabElements}
                </div>

                {/* Icons */}
                <div className="flex items-center justify-end gap-x-6">
                    <div className="size-[20px] hover:scale-125 cursor-pointer transition-all ease-in fill-[#f9f9f9]">
                        {icons.search}
                    </div>
                    {user && (
                        <div
                            className="size-[20px] hover:scale-125 cursor-pointer transition-all ease-in fill-[#f9f9f9]"
                            onClick={() => {
                                setShowProfileDropdown((prev) => !prev);
                                setShowDropdown(false);
                            }}
                        >
                            {icons.profile}
                        </div>
                    )}
                    <div
                        className="md:hidden hover:scale-125 transition-all ease-in size-[20px] fill-[#f9f9f9] cursor-pointer"
                        onClick={() => {
                            setShowDropdown((prev) => !prev);
                            setShowProfileDropdown(false);
                        }}
                    >
                        {icons.hamburgur}
                    </div>
                </div>

                {/* Hamburger Dropdown */}
                <AnimatePresence>
                    {showDropdown && (
                        <motion.div
                            className="absolute top-[42px] right-2 bg-[#f9f9f9] rounded-xl py-3 flex flex-col items-start justify-start drop-shadow-md"
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

                {/* profile dropdown */}
                <AnimatePresence>
                    {showProfileDropdown && (
                        <motion.div
                            className="absolute top-[42px] right-[52px] md:right-2 bg-[#f9f9f9] rounded-xl py-3 flex flex-col items-start justify-start drop-shadow-md"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                        >
                            {/* Pointing Tip */}
                            <div className="absolute -top-[7px] right-[10px] rounded-tl-sm size-4 bg-[#f9f9f9] rotate-45"></div>
                            {/* Dropdown Items */}
                            <div className="flex flex-col gap-y-1 px-2">
                                {profileElements}
                                <div className="flex items-center justify-evenly gap-2 mt-1">
                                    <Button
                                        btnText="Logout"
                                        className="w-full text-[#f9f9f9] rounded-md bg-gradient-to-r py-[5px] from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                                        onClick={handleLogout}
                                    />
                                    <Button
                                        btnText="Delete"
                                        className="w-full text-[#f9f9f9] rounded-md bg-gradient-to-r py-[5px] from-[#f68533] to-[#f68533] hover:from-red-600 hover:to-red-700"
                                        onClick={handleDelete}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* popups */}
            {showPopup &&
                (loading ? (
                    <Popup
                        header="Sending Password Reset Email"
                        className="text-[#f9f9f9] mt-4 py-[5px] rounded-md text-lg bg-gradient-to-r from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                        description={
                            <div className="fill-[#f68533] mt-2 text-white size-[35px]">
                                {icons.loading}
                            </div>
                        }
                        onClick={() => setShowPopup(false)}
                    />
                ) : resetMessage ? (
                    <Popup
                        header="Reset Password Failed !!"
                        className="text-[#f9f9f9] mt-2 py-[5px] rounded-md text-lg bg-gradient-to-r from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                        description={resetMessage}
                        onClick={() => setShowPopup(false)}
                    />
                ) : (
                    <Popup
                        header="Reset Password Email"
                        onClick={() => setShowPopup(false)}
                        className="text-[#f9f9f9] mt-2 py-[5px] rounded-md text-lg bg-gradient-to-r from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                        description="reset mail has been sent on your registered email, please proceed with the reset process as indicated."
                    />
                ))}

            {showDeletePopup && (
                <Popup
                    header="Reset Password Email"
                    onClick={() => setShowPopup(false)}
                    className="text-[#f9f9f9] mt-2 py-[5px] rounded-md text-lg bg-gradient-to-r from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                    description={
                        <div>
                            <input type="checkbox" />
                        </div>
                    }
                />
            )}
        </div>
    );
}
