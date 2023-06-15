import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export const useCheckAuth = () => {
  const router = useRouter()

  const { status, data } = useSession()

  useEffect(() => {
    if (
      status === 'authenticated' &&
      (router.route === '/auth/signin' ||
        router.route === '/register' ||
        router.route === '/forgot-password' ||
        router.route === '/change-password')
    ) {
      router.replace('/dashboard')
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

  return { data, status }
}
