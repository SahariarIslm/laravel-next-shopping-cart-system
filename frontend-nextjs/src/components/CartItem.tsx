'use client'

import { useDispatch } from 'react-redux'
import { CartItem as CartItemType, incrementQuantity, decrementQuantity, removeItem } from '@/store/slices/cartSlice'
import { useRemoveCartItemMutation } from '@/store/api/cartApi'
import Image from 'next/image'

interface Props {
  item: CartItemType
}

export function CartItem({ item }: Props) {
  const dispatch = useDispatch()
  const [removeFromApi] = useRemoveCartItemMutation()

  const handleIncrement = () => dispatch(incrementQuantity(item.product_id))
  const handleDecrement = () => {
    if (item.quantity === 1) return handleRemove()
    dispatch(decrementQuantity(item.product_id))
  }

  const handleRemove = async () => {
    dispatch(removeItem(item.product_id))
    try {
      await removeFromApi(item.product_id).unwrap()
    } catch (err) {
      console.error('Failed to remove from server:', err)
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={item.product.image || `https://picsum.photos/seed/${item.product_id}/80/80`}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm truncate">{item.product.name}</h3>
        <p className="text-indigo-600 font-bold text-sm mt-0.5">${item.product.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600"
        >
          −
        </button>
        <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
        <button
          onClick={handleIncrement}
          className="w-8 h-8 rounded-full bg-indigo-100 hover:bg-indigo-200 flex items-center justify-center font-bold text-indigo-600"
        >
          +
        </button>
      </div>

      <div className="text-right">
        <p className="font-bold text-gray-900">${item.subtotal.toFixed(2)}</p>
        <button
          onClick={handleRemove}
          className="text-xs text-red-400 hover:text-red-600 mt-1"
        >
          Remove
        </button>
      </div>
    </div>
  )
}