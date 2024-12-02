import { Link } from 'react-router-dom';

export default function SmallFooter() {
    // links
    const links = [
        {
            name: 'Contact Us',
            url: '/contact-us',
        },
        {
            name: 'Privacy Policy',
            url: 'privacy-policies',
        },
        {
            name: 'Chat Assistance',
            url: '/',
        },
    ];

    const linkElements = links.map((link) => (
        <Link key={link.name} to={link.url} className="underline">
            {link.name}
        </Link>
    ));

    return (
        <footer className="bg-[#f9f9f9] drop-shadow-md border-[0.01rem] border-[#dadada] text-[#1b36b2] py-2 sm:px-4 font-medium flex flex-col sm:flex-row-reverse justify-between items-center gap-1">
            <div className="flex justify-evenly gap-4 text-sm">
                {linkElements}
            </div>

            <div className="text-xs md:text-sm text-center">
                © 2024 Ministry of AYUSH, Government of India. All rights
                reserved.
            </div>
        </footer>
    );
}
