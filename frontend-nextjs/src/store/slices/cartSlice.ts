import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  id:         number
  product_id: number
  quantity:   number
  product: {
    id:          number
    name:        string
    description: string
    price:       number
    image:       string
  }
  subtotal: number
}

interface CartState {
  items:   CartItem[]
  loading: boolean
  syncing: boolean
}

const initialState: CartState = {
  items:   [],
  loading: false,
  syncing: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items   = action.payload
      state.loading = false
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setSyncing(state, action: PayloadAction<boolean>) {
      state.syncing = action.payload
    },
    incrementQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.product_id === action.payload)
      if (item) {
        item.quantity++
        item.subtotal = parseFloat((item.quantity * item.product.price).toFixed(2))
      }
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.product_id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity--
        item.subtotal = parseFloat((item.quantity * item.product.price).toFixed(2))
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.product_id !== action.payload)
    },
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(i => i.product_id === action.payload.product_id)
      if (existing) {
        existing.quantity++
        existing.subtotal = parseFloat((existing.quantity * existing.product.price).toFixed(2))
      } else {
        state.items.push(action.payload)
      }
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const {
  setCartItems,
  setLoading,
  setSyncing,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  addItem,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer