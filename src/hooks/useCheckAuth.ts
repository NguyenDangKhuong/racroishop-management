import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export const useCheckAuth = () => {
  const router = useRouter()

  const { status, data } = useSession()

  const isAdmin = data?.user.role === 0
  useEffect(() => {
    if (
      status === 'authenticated' &&
      (router.route === '/auth/signin' ||
        router.route === '/register' ||
        router.route === '/forgot-password' ||
        router.route === '/change-password')
    ) {
      isAdmin ? router.replace('/dashboard') : router.replace('/')
    } else if (
      status === 'unauthenticated' &&
      router.route !== '/auth/signin' &&
      router.route !== '/register' &&
      router.route !== '/forgot-password' &&
      router.route !== '/change-password'
    ) {
      router.replace('/auth/signin')
    }
  }, [status])
  return {
    status,
    isAuthenticated: status === 'authenticated',
    isAdmin
  }
}
