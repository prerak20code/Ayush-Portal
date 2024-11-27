import AYUSHLOGOWHITE from '../../assets/images/ayushLogoWhite.png';
import GOVINDIAIMAGE from '../../assets/images/govIndiaLogo.png';
import { icons } from '../../assets/icons';
import { NavLink } from 'react-router-dom';

export default function Footer() {
    // socials
    const socials = [icons.telegram, icons.twitter, icons.youtube];
    const socialElements = socials.map((social, index) => (
        <div
            key={index}
            className="hover:backdrop-brightness-95 hover:scale-105 transition-all ease-in  fill-[#f9f9f9] border-[0.1rem] border-[#f9f9f9] p-2 drop-shadow-md rounded-full size-fit"
        >
            <div className="size-[25px]">{social}</div>
        </div>
    ));

    // quick links
    const quickLinks = [
        { url: '', name: 'Home' },
        { url: 'about-ministry', name: 'About Ministry' },
        { url: 'servcies', name: 'AYUSH Services' },
        { url: 'privacy-policies', name: 'Privacy & Guidelines' },
        { url: 'faqs', name: 'FAQs' },
        { url: 'contact-us', name: 'Contact Us' },
    ];
    const quickLinkElements = quickLinks.map((link) => (
        <NavLink
            key={link.name}
            to={link.url}
            className={({ isActive }) =>
                `${isActive && 'underline'} hover:underline text-lg`
            }
        >
            {link.name}
        </NavLink>
    ));

    // extra links
    const extraLinks = [
        { url: 'chat', name: 'Chat Assistance' },
        { url: 'privacy-policies', name: 'Privacy & Guidelines' },
        { url: 'terms-conditions', name: 'Terms & Conditions' },
    ];
    const extraLinkElements = extraLinks.map((link) => (
        <NavLink
            key={link.name}
            to={link.url}
            className={({ isActive }) =>
                `${isActive ? 'underline' : ''} hover:underline text-lg`
            }
        >
            {link.name}
        </NavLink>
    ));

    // HTML
    return (
        <div className="w-full text-[#f9f9f9]">
            <div className="flex items-center justify-between bg-[#f68533] w-full pr-10 pl-16 py-4">
                {/* logos & socials */}
                <div className="w-[60%] flex flex-col items-start justify-between gap-14">
                    {/* logos */}
                    <div className="flex items-center justify-start flex-col md:flex-row gap-4 md:gap-36">
                        <div>
                            <div className="size-[70px] drop-shadow-md">
                                <img
                                    src={AYUSHLOGOWHITE}
                                    alt="ayush logo"
                                    className="size-full"
                                />
                            </div>
                        </div>
                        <div className="h-[60px] drop-shadow-md">
                            <img
                                src={GOVINDIAIMAGE}
                                alt="gov india image"
                                className="h-full"
                            />
                        </div>
                    </div>

                    {/* socials and ayush logo */}
                    <div className="flex items-center justify-start gap-36">
                        <div className="flex flex-col items-start justify-ccenter gap-4">
                            <p className="text-2xl font-medium">
                                Follow us on:
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                {socialElements}
                            </div>
                        </div>
                        <NavLink
                            to="/"
                            className="hover:scale-105 transition-all ease-in size-[120px] drop-shadow-md"
                        >
                            <img
                                src={AYUSHLOGOWHITE}
                                alt="ayush logo"
                                className="size-full"
                            />
                        </NavLink>
                    </div>
                </div>

                {/* links */}
                <div className="w-[40%] flex items-center justify-between">
                    {/* quick links */}
                    <div>
                        <div className="font-medium text-xl underline mb-2">
                            Quick Links
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            {quickLinkElements}
                        </div>
                    </div>
                    {/* extra  links */}
                    <div>
                        <div className="flex flex-col gap-4 items-start">
                            {extraLinkElements}
                        </div>
                        <div className="flex flex-col mt-4">
                            <p>Contact us:</p>
                            <p>+91 xxxxxx7657, xxx-xxx-xxxx</p>
                            <p>ayushstartup@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#f68533] border-t-[0.01rem] py-2 text-sm text-center border-t-[#dadada]">
                <p>
                    © 2024 Ministry of AYUSH, Government of India. All rights
                    reserved.
                </p>
            </div>
        </div>
    );
}
