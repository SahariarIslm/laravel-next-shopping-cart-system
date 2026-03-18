import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

export interface Product {
  id:          number
  name:        string
  description: string
  price:       number
  image:       string
  created_at:  string
  updated_at:  string
}

interface ProductsResponse {
  success: boolean
  data: {
    data:          Product[]
    current_page:  number
    last_page:     number
    per_page:      number
    total:         number
  }
  message: string
}

export const productApi = createApi({
  reducerPath: 'productApi',
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
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { page?: number; per_page?: number; search?: string }>({
      query: ({ page = 1, per_page = 12, search = '' } = {}) => ({
        url: '/products',
        params: { page, per_page, search: search || undefined },
      }),
    }),
    getProduct: builder.query<{ success: boolean; data: Product }, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
})

export const { useGetProductsQuery, useGetProductQuery } = productApi