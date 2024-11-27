import AYUSHLOGO from '../../assets/images/ayushLogo.png';
import GOVINDIAIMAGE from '../../assets/images/govIndiaLogo.png';
import { icons } from '../../assets/icons';

export default function Header() {
    const tabs = [
        'Home',
        'Register Now',
        'Login',
        'Track your Application',
        'FAQs',
        'About Us',
    ];
    const tabElements = tabs.map((tab) => (
        <div key={tab} className="text-[#f9f9f9] font-medium text-md">
            {tab}
        </div>
    ));
    return (
        <div className="h-[110px]">
            <div className="h-[70px] bg-[#f9f9f9] flex items-center justify-between w-full px-4 py-[5px]">
                <img
                    src={GOVINDIAIMAGE}
                    alt="gov india image"
                    className="object-cover h-full"
                />
                <img
                    src={AYUSHLOGO}
                    alt="gov india image"
                    className="object-cover rounded-full size-[60px]"
                />
            </div>
            <div className="bg-[#f68533] h-[40px] flex items-center justify-end gap-10 px-4">
                {tabElements}
                <div className="size-[20px] fill-[#f9f9f9]">{icons.search}</div>
            </div>
        </div>
    );
}
