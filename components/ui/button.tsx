import { ReactNode } from "react"

type ButtonProps = {
    text: string,
    className?: string,
    icon?: ReactNode,
    onClick?: () => void,
    variant?: 'primary' | 'secondary' | 'weight_choose',
    type?: 'button' | 'submit' | 'reset',
    disabled?: boolean,
}

export function Button(props: ButtonProps) {

    const variants = {
        primary: 'bg-[var(--color-cyan)] text-[var(--color-text-on-cyan)] font-medium hover:brightness-95 active:scale-[0.98] shadow-xs',
        secondary: 'border border-[var(--color-border)] bg-white text-[var(--color-text)] hover:bg-[var(--color-surface)] hover:border-[var(--color-border-hover)] active:scale-[0.98]',
        weight_choose: 'border-2 border-[var(--color-blue)] text-[var(--color-blue)] bg-[var(--color-blue)]/10 font-semibold shadow-xs',
    }

    const variant = props.variant ?? 'primary'
    
    return( 
        <button 
            type={props.type ?? 'button'}
            disabled={props.disabled}
            className={`cursor-pointer inline-flex flex-row justify-center items-center gap-1.5 rounded-xl px-3 py-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none ${variants[variant]} ${props.className ?? ''}`}
            onClick={props.onClick}
        >
            <span>{props.text}</span>
            {props.icon}
        </button>
    )
}