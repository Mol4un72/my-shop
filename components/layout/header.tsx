"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation"
import { UserRound, ShoppingCart, ShoppingBag, X, ClipboardList, Menu } from 'lucide-react'
import { useCart } from '@/context/cart-context'

export function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const { cart } = useCart()

    const isCatalogActive = pathname === '/' || pathname.startsWith('/products')
    const isOrdersActive = pathname.startsWith('/orders')
    const isProfileActive = pathname.startsWith('/profile')
    const isCartActive = pathname.startsWith('/cart')
    
    return (
        <>
          <header className="fixed bg-white/90 backdrop-blur-md top-0 flex w-full h-18 border-b border-[var(--color-border)] justify-between px-4 md:px-8 items-center z-50 transition-all">
              <Link href="/" className="flex items-center gap-2">
                <Image 
                  src="/logo.png"
                  alt="logo"
                  width={140}
                  height={36}
                  className="h-9 w-auto object-contain"
                  priority
                />
              </Link>

              {/* Desktop center navigation */}
              <nav className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
                <Link 
                  className={`flex items-center gap-1.5 text-base font-medium px-3.5 py-1.5 rounded-xl transition-all ${
                    isCatalogActive 
                      ? 'text-[var(--color-blue)] bg-[var(--color-blue)]/10 font-semibold' 
                      : 'text-[var(--color-text)] hover:text-[var(--color-blue)] hover:bg-[var(--color-surface)]'
                  }`} 
                  href="/"
                >
                  <ShoppingBag size={18} />
                  <span>Products</span>
                </Link>

                <Link 
                  className={`flex items-center gap-1.5 text-base font-medium px-3.5 py-1.5 rounded-xl transition-all ${
                    isOrdersActive 
                      ? 'text-[var(--color-blue)] bg-[var(--color-blue)]/10 font-semibold' 
                      : 'text-[var(--color-text)] hover:text-[var(--color-blue)] hover:bg-[var(--color-surface)]'
                  }`} 
                  href="/orders"
                >
                  <ClipboardList size={18} />
                  <span>Orders</span>
                </Link>
              </nav>

              {/* Desktop right actions */}
              <div className="hidden md:flex items-center gap-2">
                <Link 
                  href="/cart"
                  className={`relative p-2.5 rounded-xl transition-all ${
                    isCartActive 
                      ? 'text-[var(--color-blue)] bg-[var(--color-blue)]/10' 
                      : 'text-[var(--color-text)] hover:bg-[var(--color-surface)] hover:text-[var(--color-blue)]'
                  }`}
                  aria-label="Cart"
                  title="Cart"
                >
                  <ShoppingCart size={22} />
                  {cart.length > 0 && (
                    <span className="absolute top-1 right-1 flex justify-center items-center rounded-full min-w-4.5 h-4.5 px-1 text-[11px] font-bold bg-[var(--color-cyan)] text-[var(--color-text-on-cyan)] shadow-xs animate-in zoom-in-50 duration-150">
                      {cart.length > 9 ? '9+' : cart.length}
                    </span>
                  )}
                </Link>

                <Link 
                  href="/profile"
                  className={`p-2.5 rounded-xl transition-all ${
                    isProfileActive 
                      ? 'text-[var(--color-blue)] bg-[var(--color-blue)]/10' 
                      : 'text-[var(--color-text)] hover:bg-[var(--color-surface)] hover:text-[var(--color-blue)]'
                  }`}
                  aria-label="Profile"
                  title="Profile"
                >
                  <UserRound size={22} />
                </Link>
              </div>
              
              {/* Mobile controls */}
              <div className="flex md:hidden items-center gap-2">
                <Link 
                  href="/cart"
                  className="relative p-2 rounded-xl text-[var(--color-text)] hover:bg-[var(--color-surface)]"
                  aria-label="Cart"
                >
                  <ShoppingCart size={22} />
                  {cart.length > 0 && (
                    <span className="absolute top-0.5 right-0.5 flex justify-center items-center rounded-full min-w-4.5 h-4.5 px-1 text-[10px] font-bold bg-[var(--color-cyan)] text-[var(--color-text-on-cyan)] shadow-xs">
                      {cart.length > 9 ? '9+' : cart.length}
                    </span>
                  )}
                </Link>

                <button
                  className="cursor-pointer p-2 rounded-xl text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  <Menu size={24} />
                </button>
              </div>
          </header>
          <div className='h-18' />

          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-40 bg-[var(--color-navy)]/40 backdrop-blur-xs transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile drawer */}
          <nav 
            className={`fixed right-0 top-0 z-50 flex h-dvh w-72 flex-col bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center pb-4 border-b border-[var(--color-border)]">
              <span className="font-semibold text-lg text-[var(--color-text)]">Menu</span>
              <button
                className='cursor-pointer p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors'
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className='flex flex-col mt-6 gap-2 text-lg'>
              <Link 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  isCatalogActive ? 'bg-[var(--color-blue)]/10 text-[var(--color-blue)] font-semibold' : 'text-[var(--color-text)] hover:bg-[var(--color-surface)]'
                }`}
                href="/"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingBag size={20} />
                <span>Products</span>
              </Link>
              <Link 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  isOrdersActive ? 'bg-[var(--color-blue)]/10 text-[var(--color-blue)] font-semibold' : 'text-[var(--color-text)] hover:bg-[var(--color-surface)]'
                }`}
                href='/orders'
                onClick={() => setIsOpen(false)}
              >
                <ClipboardList size={20} />
                <span>Orders</span>
              </Link>
              <Link 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  isCartActive ? 'bg-[var(--color-blue)]/10 text-[var(--color-blue)] font-semibold' : 'text-[var(--color-text)] hover:bg-[var(--color-surface)]'
                }`}
                href="/cart" 
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--color-cyan)] text-[var(--color-text-on-cyan)]">
                    {cart.length}
                  </span>
                )}
              </Link>
              <Link 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  isProfileActive ? 'bg-[var(--color-blue)]/10 text-[var(--color-blue)] font-semibold' : 'text-[var(--color-text)] hover:bg-[var(--color-surface)]'
                }`}
                href="/profile" 
                onClick={() => setIsOpen(false)}
              >
                <UserRound size={20} />
                <span>Profile</span>
              </Link>
            </div>
          </nav>
        </>
    )
}
