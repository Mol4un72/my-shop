import { ReactNode } from "react"

type ButtonProps = {
    text: string,
    className?: string,
    icon?: ReactNode,
    onClick?: () => void,
}

export function Button(props: ButtonProps) {
    return( 
        <button 
            className={`flex flex-row justify-center items-center gap-1 rounded-lg bg-[var(--color-cyan)] px-2 ${props.className}`}
            onClick={props.onClick}
        >
            {props.text}{props.icon}
        </button>
    )
}