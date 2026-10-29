import type { Order } from '@/context/order-context'

export function OrderItem({ order }: {order: Order}) {
    return(
        <>
            <article className="relative flex flex-row justify-between p-4 gap-4 items-center border border-[var(--color-border)] rounded-lg">
                <div>
                    <h2>{order.id}</h2>
                    <h3 className='text-[var(--color-text-muted)]'>{order.date}</h3>
                </div>
                <div className='flex flex-col items-end'>
                    <p className='text-[var(--color-blue)]'>{order.total}$</p>            
                    <DeliveryStatus text={order.delivered ? 'received' : 'preparing'} variant={order.delivered ? 'was_delivered' : 'was_not_delivered'} />
                </div>
            </article>
        </>
    )
}

function DeliveryStatus({ variant, text }: { variant: 'was_delivered' | 'was_not_delivered', text: string }) {

    const variants = {
        was_delivered: 'bg-[var(--color-cyan-light)] text-[var(--color-blue)]/90',
        was_not_delivered: 'bg-[var(--color-cyan)]',
    }
    
    return(
        <>
            <div className={`flex justify-center min-w-25 px-3 py-0.5 rounded-lg ${variants[variant]}`}>
                {text}
            </div>
        </>
    )
}