import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './api/productApi'
import { cartApi } from './api/cartApi'
import { userApi } from './api/userApi'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]:    cartApi.reducer,
    [userApi.reducerPath]:    userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(cartApi.middleware)
      .concat(userApi.middleware),
})

export type RootState   = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch