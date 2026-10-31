'use client'

import { useRef, useState } from 'react'
import { users } from '@/mock/user'
import { Button } from '@/components/ui/button'
import { X, Settings, MapPin } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { pickUpAdress } from '@/mock/adress'

export default function ProfilePage() {
    const profileDialog = useRef<HTMLDialogElement>(null)
    const pickUpDialog = useRef<HTMLDialogElement>(null)
    const [adressState, setAdressState] = useState(pickUpAdress[0])
    const user = users[0]
    
    return(
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
            <div className="pb-4 border-b border-[var(--color-border)]">
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">Profile</h1>
            </div>

            {/* User Info Card */}
            <div className="bg-white border border-[var(--color-border)] rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Avatar className="size-16" firstLetterSize="text-2xl" />
                    <div>
                        <h2 className="text-xl font-bold text-[var(--color-text)]">{user.name} {user.surname}</h2>
                        <p className="text-sm text-[var(--color-text-muted)]">{user.email}</p>
                    </div>
                </div>

                <Button 
                    text="Settings"
                    variant="secondary"
                    icon={<Settings size={16} />}
                    className="h-10 text-sm font-medium self-end sm:self-auto"
                    onClick={() => profileDialog.current?.showModal()}
                />
            </div>

            {/* Pickup Address Card */}
            <div className="bg-white border border-[var(--color-border)] rounded-3xl p-6 shadow-xs flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-[var(--color-blue)]" />
                    <h2 className="text-lg font-bold text-[var(--color-text)]">Main pickup address</h2>
                </div>

                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4'>
                    <div>
                        <h3 className='font-semibold text-base text-[var(--color-text)]'>{adressState.city}</h3>
                        <p className='text-sm text-[var(--color-text-muted)]'>{adressState.adress}</p>
                    </div>
                    <button 
                        type="button"
                        className='cursor-pointer text-sm font-semibold text-[var(--color-blue)] hover:underline self-end sm:self-auto' 
                        onClick={() => pickUpDialog.current?.showModal()}
                    >
                        Change address
                    </button>
                </div>
            </div>

            {/* Profile Settings Modal */}
            <dialog 
                ref={profileDialog} 
                className='rounded-3xl border border-[var(--color-border)] m-auto w-[92vw] max-w-md bg-white p-6 sm:p-8 shadow-2xl open:animate-in open:zoom-in-95'
            >
                <div className='flex justify-between items-center pb-4 border-b border-[var(--color-border)] mb-5'>
                    <h2 className='text-xl font-bold text-[var(--color-text)]'>Edit Profile</h2>
                    <button 
                        type="button"
                        onClick={() => profileDialog.current?.close()}
                        className="cursor-pointer p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form className='flex flex-col gap-4' onSubmit={(e) => { e.preventDefault(); profileDialog.current?.close() }}>
                    <div className='flex flex-col gap-2 items-center'>
                        <Avatar className='size-20' firstLetterSize='text-3xl'/>
                        <label className='cursor-pointer text-sm font-medium text-[var(--color-blue)] hover:underline' htmlFor='avatarEdit'>
                            Change photo
                        </label>
                        <input id='avatarEdit' className='hidden' type='file' accept="image/*" />
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]' htmlFor='name'>
                            Name
                        </label>
                        <input 
                            id='name' 
                            defaultValue={user.name}
                            className='border border-[var(--color-border)] rounded-xl h-10 px-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/10 transition-all'
                        />
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <label className='text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]' htmlFor='email'>
                            Email
                        </label>
                        <input 
                            id='email' 
                            defaultValue={user.email}
                            type="email"
                            className='border border-[var(--color-border)] rounded-xl h-10 px-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/10 transition-all'
                        />
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                        <Button text='Save changes' type="submit" className='h-11 text-base font-semibold' />
                        <Button 
                            text="Log out" 
                            variant='secondary' 
                            type="button"
                            className='h-10 text-sm font-medium text-red-600 hover:bg-red-50 hover:border-red-200' 
                            onClick={() => profileDialog.current?.close()}
                        />
                    </div>
                </form>
            </dialog>

            {/* Address Selection Modal */}
            <dialog 
                ref={pickUpDialog} 
                className='rounded-3xl border border-[var(--color-border)] m-auto w-[92vw] max-w-md bg-white p-6 sm:p-8 shadow-2xl open:animate-in open:zoom-in-95'
            >
                <div className='flex justify-between items-center pb-4 border-b border-[var(--color-border)] mb-4'>
                    <h2 className='text-xl font-bold text-[var(--color-text)]'>Select Pickup Address</h2>
                    <button 
                        type="button"
                        onClick={() => pickUpDialog.current?.close()}
                        className="cursor-pointer p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className='max-h-80 overflow-y-auto pr-1'>
                    <div className='flex flex-col gap-2.5'>
                        {pickUpAdress.map((item) => (
                            <button
                                key={item.id}
                                type="button" 
                                onClick={() => {
                                    setAdressState(item)
                                    pickUpDialog.current?.close()
                                }}
                                className={`cursor-pointer w-full text-left flex justify-between items-center border rounded-2xl p-4 transition-all ${
                                    adressState.id === item.id 
                                        ? 'border-[var(--color-blue)] bg-[var(--color-blue)]/5 ring-1 ring-[var(--color-blue)]' 
                                        : 'border-[var(--color-border)] bg-white hover:bg-[var(--color-surface)]'
                                }`}
                            >
                                <div className='flex flex-col'>
                                    <h3 className='font-semibold text-base text-[var(--color-text)]'>{item.city}</h3>
                                    <p className='text-sm text-[var(--color-text-muted)]'>{item.adress}</p>
                                </div>
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                    adressState.id === item.id
                                        ? 'bg-[var(--color-blue)] text-white'
                                        : 'text-[var(--color-blue)] bg-[var(--color-surface)]'
                                }`}>
                                    {adressState.id === item.id ? 'Selected' : 'Choose'}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </dialog>
        </main>
    )
}
