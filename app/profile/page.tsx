import { orders } from '@/mock/orders'
import { users } from '@/mock/user'
import { OrderItem } from '@/components/order-item'

export default function ProfilePage() {
    return(
        <>
            <section className="flex flex-col gap-4 p-6 md:max-w-150 md:mx-auto">
                <h1 className="text-2xl md:hidden">Profile</h1>
                <div className="relative flex flex-row p-4 gap-4 items-center border border-[var(--color-border)] rounded-lg">
                    <div className="rounded-full w-16 h-16 border border-[var(--color-cyan)]"></div>
                    <div>
                        <h2>Name Surname</h2>
                        <h3>gmail@gmail.com</h3>
                    </div>
                    <p className="absolute right-2.5 bottom-2.5 text-[var(--color-blue)]">Change</p>
                </div>
                <div className="flex flex-row justify-between">
                    <h2 className="text-lg">My orders</h2>
                    <p className="text-sm text-[var(--color-blue)]">See all</p>
                </div>
                <div className='border border-[var(--color-border)] rounded-lg p-2 max-h-[300px] overflow-y-auto'>
                    <div className='flex flex-col gap-3'>
                        {orders.map((order) => (
                            <OrderItem key={order.id} order={order}/>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-lg">Delivery adress</h2>
                    <div className='flex flex-row justify-between border border-[var(--color-border)] rounded-lg p-4'>
                        <h3>{users[0].adress}</h3>
                        <button className='text-[var(--color-blue)]'>change</button>
                    </div>
                </div>
                <button className='border border-[var(--color-border)] p-3 justify-center text-xl rounded-lg'>Log out</button>
            </section>
        </>
    )
}