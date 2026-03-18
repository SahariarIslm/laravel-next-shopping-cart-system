'use client'

import { useDispatch, useSelector } from 'react-redux'
import { Product } from '@/store/api/productApi'
import { addItem } from '@/store/slices/cartSlice'
import { RootState } from '@/store/store'
import Image from 'next/image'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const dispatch  = useDispatch()
  const user      = useSelector((state: RootState) => state.auth.user)
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const inCart    = cartItems.find(i => i.product_id === product.id)

  const handleAddToCart = () => {
    if (!user) return
    dispatch(addItem({
      id:         0, // will be assigned by backend
      product_id: product.id,
      quantity:   1,
      product,
      subtotal:   product.price,
    }))
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-gray-100">
        <Image
          src={product.image || `https://picsum.photos/seed/${product.id}/400/300`}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm truncate">{product.name}</h3>
        <p className="text-gray-500 text-xs mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-indigo-600 font-bold">${product.price.toFixed(2)}</span>
          {user ? (
            <button
              onClick={handleAddToCart}
              className={`text-sm px-3 py-1.5 rounded-md font-medium transition-colors ${
                inCart
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {inCart ? `In Cart (${inCart.quantity})` : 'Add to Cart'}
            </button>
          ) : (
            <span className="text-xs text-gray-400">Login to add</span>
          )}
        </div>
      </div>
    </div>
  )
}