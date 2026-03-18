import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthUser {
  uid:         string
  name:        string
  email:       string
  avatar:      string | null
  firebaseToken: string
}

interface AuthState {
  user:    AuthUser | null
  loading: boolean
}

const initialState: AuthState = {
  user:    null,
  loading: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user    = action.payload
      state.loading = false
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    clearUser(state) {
      state.user    = null
      state.loading = false
    },
  },
})

export const { setUser, setLoading, clearUser } = authSlice.actions
export default authSlice.reducer