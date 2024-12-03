import { Link } from 'react-router-dom';

export default function SmallFooter() {
    // links
    const links = [
        {
            name: 'Contact Us',
            url: '/contact-us',
        },
        {
            name: 'About Us',
            url: '/about-us',
        },
        {
            name: 'Privacy Policy',
            url: 'privacy-policies',
        },
        {
            name: 'FAQs',
            url: '/faqs',
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
        <footer className="bg-[#f9f9f9] drop-shadow-md border-[0.01rem] border-[#dadada] text-[#1b36b2] py-2 sm:px-4 font-medium flex flex-col md:flex-row-reverse justify-between items-center gap-2 transition-all ease-in">
            <div className="flex justify-evenly gap-4 lg:gap-8 text-sm">
                {linkElements}
            </div>

            <div className="text-xs md:text-sm text-center">
                © 2024 Ministry of AYUSH, Government of India.
            </div>
        </footer>
    );
}
