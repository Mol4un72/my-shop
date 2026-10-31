import { users } from '@/mock/user'
import Image from 'next/image'

export function Avatar({className, firstLetterSize = 'text-xl'}: {className?: string, firstLetterSize?: string}) {
    const user = users[0]
    return(
        <div className='flex justify-center shrink-0'>
            <div className={`rounded-full size-14 border-2 border-[var(--color-cyan)] bg-[var(--color-cyan-light)] text-[var(--color-blue)] font-bold flex items-center justify-center overflow-hidden shadow-xs select-none ${className ?? ''}`}>
                {user.avatarURL ? (
                    <Image src={user.avatarURL} alt={user.name} width={64} height={64} className="w-full h-full object-cover" />
                ) : (
                    <span className={`${firstLetterSize} font-bold leading-none`}>
                        {user.name.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>
        </div>
    )
}
