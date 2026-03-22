'use client'

import { useCartSync } from '@/hooks/useCartSync'

// This component runs the cart sync listener. Renders nothing.
export function CartSyncInitializer() {
  useCartSync()
  return null
}
