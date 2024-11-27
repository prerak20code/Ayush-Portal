import AYUSHLOGOWHITE from '../../assets/images/ayushLogoWhite.png';
import GOVINDIAIMAGE from '../../assets/images/govIndiaLogo.png';
import { icons } from '../../assets/icons';
import { NavLink } from 'react-router-dom';

export default function Footer() {
    const socials = [icons.telegram, icons.twitter, icons.youtube];
    const socialElements = socials.map((social, index) => (
        <div
            key={index}
            className="fill-[#f9f9f9] border-[0.1rem] border-[#f9f9f9] p-2 rounded-full size-fit"
        >
            <div className="size-[25px]">{social}</div>
        </div>
    ));
    const quickLinks = [
        'Home',
        'About Ministry',
        'AYUSH Services',
        'Privacy & Guidelines',
        'Contact Us',
    ];
    const quickLinkElements = quickLinks.map((link) => (
        <div
            key={link}
            className="text-lg"
            // to="/"
            // className={({ isActive }) => `${isActive && 'underline'}`}
        >
            {link}
        </div>
    ));
    const extraLinks = [
        'Chat Assistance',
        'Privacy Policy',
        'Terms & Conditions',
    ];
    const extraLinkElements = extraLinks.map((link) => (
        <div
            key={link}
            className="text-lg"
            // to="/"
            // className={({ isActive }) =>
            //     `${isActive ? 'underline' : ''} text-lg`
            // }
        >
            {link}
        </div>
    ));
    return (
        <div className="w-full text-[#f9f9f9]">
            <div className="flex items-center justify-between bg-[#f68533] w-full pr-10 pl-16 py-4">
                <div className="w-[60%] flex flex-col items-start justify-between gap-14">
                    <div className="flex items-center justify-start gap-36">
                        <div>
                            <img
                                src={AYUSHLOGOWHITE}
                                alt="ayush logo"
                                className="size-[70px]"
                            />
                        </div>
                        <div>
                            <img
                                src={GOVINDIAIMAGE}
                                alt="gov india image"
                                className="h-[60px]"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-start gap-36">
                        <div className="flex flex-col items-start justify-ccenter gap-4">
                            <p className="text-2xl font-medium">
                                Follow us on:
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                {socialElements}
                            </div>
                        </div>
                        <div>
                            <img
                                src={AYUSHLOGOWHITE}
                                alt="ayush logo"
                                className="size-[120px]"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-[40%] flex items-center justify-between">
                    <div>
                        <div className="font-medium text-xl underline mb-2">
                            Quick Links
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            {quickLinkElements}
                        </div>
                    </div>
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
