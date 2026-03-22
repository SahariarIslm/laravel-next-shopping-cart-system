import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

interface UserResponse {
  success: boolean
  data: {
    id: number
    uid: string
    name: string
    email: string
    avatar: string | null
  }
  message: string
}

export const userApi = createApi({
  reducerPath: 'userApi',
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
    syncUser: builder.mutation<UserResponse, void>({
      query: () => ({
        url: '/user/sync',
        method: 'POST',
      }),
    }),
    getUser: builder.query<UserResponse, void>({
      query: () => '/user',
    }),
  }),
})

export const {
  useSyncUserMutation,
  useGetUserQuery,
} = userApi
