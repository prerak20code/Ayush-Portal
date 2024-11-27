export default function Button({
    onClick,
    btnText,
    className = '',
    type = 'button',
    disabled = false,
    height = '',
    width = '',
}) {
    return (
        <button
            style={{ height, width }}
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`bg-gradient-to-r from-[#f9f9f9] to-[#e1e1e1] hover:scale-105 hover:to-[#cbcbcb] transition-all ease-in duration-150 relative flex items-center justify-center overflow-hidden drop-shadow-md text-[#040606] px-5 py-2 text-md font-semibold rounded-full group ${className}`}
        >
            {btnText}
        </button>
    );
}
