import { FirstHalf, SecondHalf, ThirdHalf, FourthHalf } from '../components';

export default function HomePage() {
    return (
        <div className="flex flex-col gap-20 pb-28">
            <FirstHalf />
            <SecondHalf />
            <ThirdHalf />
            <FourthHalf />
        </div>
    );
}
