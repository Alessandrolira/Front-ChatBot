interface ButtonProps {
    children: React.ReactNode
    onclick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button( { children, onclick } : ButtonProps ) {
    return (
        <button onClick={onclick} className="bg-[var(--azulw3)] py-[0.5em] px-[1em] rounded-md text-white font-semibold shadow-md shadow-black/30 cursor-pointer hover:bg-[var(--azulw3-hover)] transition duration-300 ease-in-out inset-shadow-sm inset-shadow-black/30">
            {children}
        </button>
    )
}