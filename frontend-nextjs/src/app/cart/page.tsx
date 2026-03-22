'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AuthGuard } from '@/components/AuthGuard'
import { CartItem } from '@/components/CartItem'
import { useGetCartQuery } from '@/store/api/cartApi'
import { setCartItems, setLoading } from '@/store/slices/cartSlice'
import { RootState } from '@/store/store'
import Link from 'next/link'

function CartContent() {
  const dispatch  = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const syncing   = useSelector((state: RootState) => state.cart.syncing)

  const { data, isLoading } = useGetCartQuery()

  useEffect(() => {
    if (data?.data) {
      dispatch(setCartItems(data.data))
    }
  }, [data, dispatch])

  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [isLoading, dispatch])

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0)

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-28 bg-white rounded-xl animate-pulse border border-gray-100" />
        ))}
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 text-sm mb-6">Add some products to get started</p>
        <Link
          href="/"
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-3">
        {cartItems.map((item) => (
          <CartItem key={item.product_id} item={item} />
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-fit">
        <h2 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Items ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900 text-base">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {syncing && (
          <p className="text-xs text-gray-400 mt-3 animate-pulse text-center">Syncing cart…</p>
        )}

        <button className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
          Checkout
        </button>
      </div>
    </div>
  )
}

export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>
      <AuthGuard>
        <CartContent />
      </AuthGuard>
    </div>
  )
}