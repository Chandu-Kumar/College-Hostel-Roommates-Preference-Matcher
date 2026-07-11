function HobbyChip({
    hobby,
    selected,
    onClick,
}) {

    return (

        <button
            type="button"
            onClick={onClick}
            className={`
                px-5
                py-3
                rounded-xl
                border-2
                transition-all
                duration-200
                font-semibold
                hover:scale-105

                ${
                    selected
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : "bg-white border-gray-300 hover:border-blue-400"
                }
            `}
        >

            {hobby}

        </button>

    );

}

export default HobbyChip;