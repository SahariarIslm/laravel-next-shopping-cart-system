'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { setUser, clearUser } from '@/store/slices/authSlice'
import { useSyncUserMutation } from '@/store/api/userApi'
import { RootState } from '@/store/store'

export function useAuth() {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state: RootState) => state.auth)
  const [syncUser] = useSyncUserMutation()

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
        
        // Sync user to backend database
        try {
          await syncUser().unwrap()
          console.log('User synced to database')
        } catch (err) {
          console.error('Failed to sync user:', err)
        }
      } else {
        dispatch(clearUser())
      }
    })

    return () => unsubscribe()
  }, [dispatch, syncUser])

  return { user, loading }
}