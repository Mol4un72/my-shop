type Props = {
    className?: string,
    onMinus?: () => void,
    onPlus?: () => void,
    value?: number,
}

export function CountButton({className, onMinus, onPlus, value}: Props) {
    
    return(
        <div className={`flex flex-row rounded-xl min-w-24 h-9 border border-[var(--color-border)] bg-white items-center justify-between px-2 select-none shadow-2xs ${className ?? ''}`}>
            <button
                type="button"
                onClick={onMinus}
                aria-label="Decrease quantity"
                className='cursor-pointer flex items-center justify-center size-6 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] active:scale-90 transition-all font-semibold text-base'
            >
                -
            </button>
            <span className='font-semibold text-sm px-2 text-center text-[var(--color-text)]'>{value}</span>
            <button
                type="button"
                onClick={onPlus}
                aria-label="Increase quantity"
                className='cursor-pointer flex items-center justify-center size-6 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] active:scale-90 transition-all font-semibold text-base'
            >
                +
            </button>
        </div>
    )
}