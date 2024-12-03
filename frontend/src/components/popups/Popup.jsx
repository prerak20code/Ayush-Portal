import { Button } from '..';

export default function Popup({
    header,
    description,
    btnText = 'Close',
    className = '',
    onClick,
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-65">
            <div className="drop-shadow-md bg-[#f9f9f9] text-center rounded-lg flex flex-col gap-4 items-center w-[90%] max-w-md p-6">
                <h2 className="text-xl font-bold text-[#040606]">{header}</h2>
                <p className="text-gray-600 text-[15px]">{description}</p>
                <Button
                    className={className}
                    btnText={btnText}
                    onClick={onClick}
                />
            </div>
        </div>
    );
}
