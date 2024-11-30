import { FirstHalf, SecondHalf, ThirdHalf, FourthHalf } from '../components';

export default function HomePage() {
    // variants
    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.2, duration: 0.8 },
        },
    };
    const iconVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.3, duration: 0.8, ease: 'easeOut' },
        }),
    };

    // HTML
    return (
        <div className="h-full flex flex-col gap-28 pb-28 bg-[#f9f9f9]">
            <FirstHalf />
            <SecondHalf variants={{ iconVariants, textVariants }} />
            <ThirdHalf variants={{ iconVariants, textVariants }} />
            <FourthHalf variants={{ iconVariants, textVariants }} />
        </div>
    );
}
