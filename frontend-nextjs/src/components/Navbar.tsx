'use client'

import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { clearUser } from '@/store/slices/authSlice'
import { clearCart } from '@/store/slices/cartSlice'
import { RootState } from '@/store/store'
import Image from 'next/image'

export function Navbar() {
  const dispatch  = useDispatch()
  const { user }  = useSelector((state: RootState) => state.auth)
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const syncing   = useSelector((state: RootState) => state.cart.syncing)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = async () => {
    await signOut(auth)
    dispatch(clearUser())
    dispatch(clearCart())
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-indigo-600">
            ShopCart
          </Link>

          <div className="flex items-center gap-4">
            {syncing && (
              <span className="text-xs text-gray-400 animate-pulse">Syncing…</span>
            )}

            {user && (
              <Link
                href="/cart"
                className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                🛒 Cart
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                {user.avatar && (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="text-sm text-gray-700 hidden sm:block">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}