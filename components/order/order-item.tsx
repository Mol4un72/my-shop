import type { Order } from '@/context/order-context'
import { ChevronRight } from 'lucide-react'

export function OrderItem({ order }: {order: Order}) {
    return(
        <article className="group bg-white border border-[var(--color-border)] hover:border-[var(--color-blue)]/50 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all flex justify-between items-center">
            <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">Order</span>
                <h2 className="text-base sm:text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-blue)] transition-colors">
                    №{order.id}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-[var(--color-text-muted)]">
                    <span>{order.date}</span>
                    <span>•</span>
                    <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                </div>
            </div>

            <div className='flex items-center gap-3 sm:gap-4'>
                <div className='flex flex-col items-end gap-1.5'>
                    <p className='text-lg sm:text-xl font-extrabold text-[var(--color-blue)]'>{order.total}$</p>            
                    <DeliveryStatus 
                        text={order.delivered ? 'Delivered' : 'In preparation'} 
                        variant={order.delivered ? 'was_delivered' : 'was_not_delivered'} 
                    />
                </div>
                <ChevronRight size={20} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-blue)] group-hover:translate-x-0.5 transition-all" />
            </div>
        </article>
    )
}

function DeliveryStatus({ variant, text }: { variant: 'was_delivered' | 'was_not_delivered', text: string }) {
    const variants = {
        was_delivered: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        was_not_delivered: 'bg-amber-50 text-amber-700 border border-amber-200',
    }
    
    return(
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${variants[variant]}`}>
            <span className={`size-1.5 rounded-full ${variant === 'was_delivered' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            {text}
        </span>
    )
}
