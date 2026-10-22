"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation"
import { UserRound, ShoppingCart, ShoppingBag, X } from 'lucide-react'

export function Header() {

    const[isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    
    return (
        <>
          <header className="fixed bg-white top-0 flex w-full h-20 border-b border-[var(--color-border)] justify-between px-6 items-center z-1000">
              <Link
                href="/"
              >
                <Image 
                  src="/logo.png"
                  alt="logo"
                  width={160}
                  height={0}
                />
              </Link>
              <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2">
                {pathname !== '/products' && (
                  <Link className='flex flex-row text-xl gap-1 mt-1' href="/products">
                    Products<ShoppingBag size={20} className='mt-1' />
                  </Link>
                )}
              </nav>

              <div className="hidden md:flex flex items-center gap-6">
                <Link href="/cart">
                  <ShoppingCart />
                </Link>

                <Link href="/profile">
                  <UserRound />
                </Link>
              </div>
              
              <button
                className="text-4xl md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Меню"
              >
                ☰
              </button>
          </header>
          <div className='flex h-20'/>

          <div
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
              isOpen
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Burger menu */}
          <nav 
            className={`fixed right-0 top-0 z-50 flex h-dvh w-72 flex-col bg-white p-8    shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <button
              className='absolute text-3xl right-8 top-6'
              onClick={() => {setIsOpen(false)}}
            >
              <X size={32} strokeWidth={2.5} />
            </button>
            <div className='flex flex-col items-center mt-16 text-4xl gap-7'>
              <Link 
                className='flex flex-row gap-1' 
                href="/products"
                onClick={() => setIsOpen(false)}
              >
                  Products<ShoppingBag className='mt-2.5'/>
              </Link>
              <Link
                className='flex flex-row gap-1' 
                href="/profile" 
                onClick={() => setIsOpen(false)}
              >
                Profile<UserRound className='mt-2.5'/>
              </Link>
              <Link 
                className='flex flex-row gap-1'
                href="/cart" 
                onClick={() => setIsOpen(false)}>
                  Cart<ShoppingCart className='mt-2.5'/>
              </Link>
            </div>
          </nav>
        </>
    )
}