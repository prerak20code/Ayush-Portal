import { icons } from '../../assets/icons';

export default function Statistics() {
    const statistics = [
        {
            icon: icons.badge,
            count: 150514,
            description: 'Total\nInvestors',
        },
        {
            icon: icons.investment,
            count: '1.7cr',
            description: 'Total\nInvestment',
        },
        {
            icon: icons.locationPinPoint,
            count: 277,
            description: 'Invested\nSectors',
        },
    ];
    const statisticsElements = statistics.map((data, index) => (
        <div
            key={data.description}
            className="text-[#0d0d0d] flex items-start justify-start h-full pr-10"
        >
            <div className="flex items-start justify-start h-full">
                {/* icon */}
                <div className="bg-white drop-shadow-md rounded-full p-2 mr-6">
                    <div className="size-[33px] fill-[#f68533]">
                        {data.icon}
                    </div>
                </div>
                {/* data */}
                <div className="flex gap-6 items-start mr-[60px]">
                    <div className="text-[2.5rem] font-semibold leading-10">
                        {data.count}
                    </div>
                    <div className="text-[1.5rem] font-medium whitespace-pre-line">
                        {data.description}
                    </div>
                </div>
            </div>
            {/* Separator */}
            {index < statistics.length - 1 && (
                <div className="h-full w-[0.1rem] bg-[#afafaf] rounded-full mr-6" />
            )}
        </div>
    ));
    return (
        <div className="py-4 shadow-md shadow-gray-100 bg-opacity-35 bg-[#f9f9f9] h-[100px] overflow-x-scroll w-full flex items-center justify-center">
            <div className="w-[80%] flex items-center justify-evenly h-full">
                {statisticsElements}
            </div>
        </div>
    );
}
