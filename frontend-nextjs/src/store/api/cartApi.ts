import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { CartItem } from '../slices/cartSlice'

interface CartResponse {
  success: boolean
  data:    CartItem[]
  message: string
}

interface BatchItem {
  product_id: number
  quantity:   number
}

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.firebaseToken
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      headers.set('Accept', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    batchUpdateCart: builder.mutation<{ success: boolean; message: string }, BatchItem[]>({
      query: (items) => ({
        url: '/cart/batch-update',
        method: 'POST',
        body: { items },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeCartItem: builder.mutation<{ success: boolean; message: string }, number>({
      query: (productId) => ({
        url: `/cart/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
})

export const {
  useGetCartQuery,
  useBatchUpdateCartMutation,
  useRemoveCartItemMutation,
} = cartApi