'use client'

import { useRef, useState } from 'react'
import { users } from '@/mock/user'
import { OrderItem } from '@/components/profile/order-item'
import { useOrder } from '@/context/order-context'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { pickUpAdress } from '@/mock/adress'

export default function ProfilePage() {

    const profileDialog = useRef<HTMLDialogElement>(null)
    const pickUpDialog = useRef<HTMLDialogElement>(null)
    const { orderList } = useOrder()
    const[adressState, setAdressState] = useState(pickUpAdress[0])
    
    return(
        <>
            <section className="flex flex-col gap-4 p-6 md:max-w-150 md:mx-auto">
                <h1 className="text-2xl md:hidden">Profile</h1>
                <div className="relative flex flex-row p-4 gap-4 items-center border border-[var(--color-border)] rounded-lg">
                    <Avatar />
                    <div>
                        <h2>{users[0].name}</h2>
                        <h3>{users[0].email}</h3>
                    </div>
                    <button onClick={() => profileDialog.current?.showModal()} className="absolute right-2.5 bottom-2.5 text-[var(--color-blue)]">Settings</button>
                </div>
                <div className="flex flex-row justify-between">
                    <h2 className="text-lg">My orders</h2>
                </div>
                <div className='border border-[var(--color-border)] rounded-lg p-2 h-[300px] overflow-y-auto'>
                    <div className='flex flex-col gap-3'>
                        {orderList.length === 0 ? (
                            <div className="flex flex-col gap-1 items-center justify-center text-center py-20 px-4">
                                <h2 className="text-2xl font-semibold">
                                    No orders found
                                </h2>
                                <p className="mt-2 text-gray-500">
                                    Go to cart and make your order.
                                </p>
                                <Link href={`/cart`}>
                                    <Button text="to cart page" className='px-4 max-w-fit' variant="secondary" />
                                </Link>
                            </div>
                        ) : (
                            orderList.map((order) => (
                                <OrderItem key={order.id} order={order}/>
                        )))}
                    </div>
                </div>
                <div>
                    <h2 className="text-lg">Main pickup adress</h2>
                    <div className='flex flex-row justify-between border border-[var(--color-border)] rounded-lg p-4'>
                        <h3>{adressState.city}, {adressState.adress}</h3>
                        <button className='text-[var(--color-blue)]' onClick={() => pickUpDialog.current?.showModal()}>Change</button>
                    </div>
                </div>
            </section>

            <dialog ref={profileDialog} className='rounded-lg border border-[var(--color-border)] m-auto w-full h-120 bg-white py-6 px-7 md:max-w-90 md:mx-auto'>
                <div className='flex flex-row justify-between'>
                    <h2 className='text-2xl'>Profile</h2>
                    <button onClick={() => profileDialog.current?.close()}>
                        <X />
                    </button>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-1 items-center'>
                        <Avatar className='h-25 w-25' firstLetterSize='text-3xl'/>
                        <label className='text-[var(--color-blue)]' htmlFor='avatarEdit'>change</label>
                        <input id='avatarEdit' className='hidden' type='file' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-2xl' htmlFor='name'>Name</label>
                        <input id='name' className='border border-[var(--color-border)] rounded-lg h-8 text-lg'></input>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-2xl' htmlFor='email'>Email</label>
                        <input id='email' className='border border-[var(--color-border)] rounded-lg h-8 text-lg'></input>
                    </div>
                    <Button text='Change' className='h-8 text-xl' />
                    <Button text="Log out" variant='secondary' className='border border-[var(--color-border)] p-3 justify-center text-xl rounded-lg h-8' />
                </div>
            </dialog>

            <dialog ref={pickUpDialog} className='rounded-lg border border-[var(--color-border)] m-auto w-full h-120 bg-white py-6 px-7 md:max-w-90 md:mx-auto'>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-row justify-between'>
                        <h2 className='text-2xl'>Pick up adress</h2>
                        <button onClick={() => pickUpDialog.current?.close()}>
                            <X />
                        </button>
                    </div>
                    <div className='gap-2 h-[380px] overflow-y-auto'>
                        <div className='flex flex-col gap-3'>
                            {pickUpAdress.map((item) => (
                                <div key={item.id} className='flex flex-row justify-between items-center border border-[var(--color-border)] rounded-lg h-20 p-4'>
                                    <div className='flex flex-col'>
                                        <h3 className='text-xl'>{item.city}</h3>
                                        <p>{item.adress}</p>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setAdressState(pickUpAdress[item.id])
                                            pickUpDialog.current?.close()
                                        }}
                                        className='flex text-[var(--color-blue)]'
                                    >
                                        Choose
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    )
}