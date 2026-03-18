'use client'

import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { useBatchUpdateCartMutation } from '@/store/api/cartApi'
import { setSyncing } from '@/store/slices/cartSlice'

export function useCartSync() {
  const dispatch   = useDispatch()
  const cartItems  = useSelector((state: RootState) => state.cart.items)
  const user       = useSelector((state: RootState) => state.auth.user)
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFirstRun = useRef(true)

  const [batchUpdate] = useBatchUpdateCartMutation()

  useEffect(() => {
    // Skip on initial load — cart is populated from API, not changes
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    if (!user) return

    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(async () => {
      if (cartItems.length === 0) return

      dispatch(setSyncing(true))
      try {
        const items = cartItems.map(item => ({
          product_id: item.product_id,
          quantity:   item.quantity,
        }))
        await batchUpdate(items).unwrap()
      } catch (err) {
        console.error('Cart sync failed:', err)
      } finally {
        dispatch(setSyncing(false))
      }
    }, 1500)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [cartItems, user])
}