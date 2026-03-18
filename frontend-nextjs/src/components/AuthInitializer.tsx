'use client'

import { useAuth } from '@/hooks/useAuth'

// This component runs the auth listener. Renders nothing.
export function AuthInitializer() {
  useAuth()
  return null
}