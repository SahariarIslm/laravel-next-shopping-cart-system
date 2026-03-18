'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { setUser, clearUser } from '@/store/slices/authSlice'
import { RootState } from '@/store/store'

export function useAuth() {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken()
        dispatch(setUser({
          uid:           firebaseUser.uid,
          name:          firebaseUser.displayName ?? 'User',
          email:         firebaseUser.email ?? '',
          avatar:        firebaseUser.photoURL,
          firebaseToken: token,
        }))
      } else {
        dispatch(clearUser())
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  return { user, loading }
}