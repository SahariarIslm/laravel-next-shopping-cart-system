'use client'

import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { AuthInitializer } from '@/components/AuthInitializer'
import { CartSyncInitializer } from '@/components/CartSyncInitializer'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      <CartSyncInitializer />
      {children}
    </Provider>
  )
}