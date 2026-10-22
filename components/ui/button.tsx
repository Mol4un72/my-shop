import { ReactNode } from "react"

type ButtonProps = {
    text: string,
    className?: string,
    icon?: ReactNode,
    onClick?: () => void,
    variant?: 'primary' | 'secondary' | 'weight_choose',
}

export function Button(props: ButtonProps) {

    const variants = {
        primary: 'bg-[var(--color-cyan)]',
        secondary: 'border border-[var(--color-border)]',
        weight_choose: 'border border-[var(--color-blue)] text-[var(--color-blue)] bg-[var(--color-blue)]/10',
    }

    const variant = props.variant ?? 'primary'
    
    return( 
        <button 
            className={`flex flex-row justify-center items-center gap-1 rounded-lg px-2 w-full ${props.className} ${variants[variant]}`}
            onClick={props.onClick}
        >
            {props.text}{props.icon}
        </button>
    )
}