type Props = {
    className?: string,
    onMinus?: () => void,
    onPlus?: () => void,
    value?: number,
}

export function CountButton({className, onMinus, onPlus, value}: Props) {
    
    return(
        <>
            <div className={`flex flex-row relative rounded-lg min-w-22 border border-[var(--color-border)] items-center justify-center ${className}`}>
                <button
                    onClick={onMinus}
                    className='absolute left-4'
                >
                    -
                </button>
                {value}
                <button
                    onClick={onPlus}
                    className='absolute right-4'
                >
                    +
                </button>
            </div>
        </>
    )
}