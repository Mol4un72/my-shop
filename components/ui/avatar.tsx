import { users } from '@/mock/user'

export function Avatar({className, firstLetterSize}: {className?: string, firstLetterSize?: string}) {
    return(
        <div className='flex justify-center'>
            <div className={`rounded-full w-16 h-16 border border-[var(--color-cyan)] flex items-center justify-center overflow-hidden ${className}`}>
                {users[0].avatarURL ? (
                    <img src={users[0].avatarURL} alt={users[0].name} className="w-full h-full object-cover" />
                ) : (
                    <p className={`${firstLetterSize}`}>
                        {users[0].name.charAt(0).toUpperCase()}
                    </p>
                )}
            </div>
        </div>
    )
}