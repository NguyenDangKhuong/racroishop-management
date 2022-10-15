import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { get } from '../utils/api'

export default function useUser({
  redirectTo = '',
  redirectIfFoundUser = false
} = {}) {
  const router = useRouter()
  const { isLoading, data: session } = useQuery(
    ['fetchUser'],
    () => get(`/api/user/`).then(res => res.data),
    {
      initialData: {
        isLoggedIn: false
      }
    }
  )

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !session) return

    if (
      // If redirectTo is set, redirect if not login.
      (redirectTo && !redirectIfFoundUser && !session?.isLoggedIn) ||
      // If redirectIfFoundUser is also set, redirect if the user login
      (redirectIfFoundUser && session?.isLoggedIn)
    ) {
      router.push(redirectTo)
    }
  }, [session, redirectIfFoundUser, redirectTo])

  return { session, isLoading }
}
