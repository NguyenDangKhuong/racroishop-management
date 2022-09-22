import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { get } from '../utils/api'

export default function useAuth({
  redirectTo = '',
  redirectIfFoundUser = false
} = {}) {
  const router = useRouter()
  const { isLoading, data: session } = useQuery(['fetchUser'], () =>
    get(`/api/user/`).then(res => res.data)
  )
  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFoundUser && !session?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFoundUser && session?.isLoggedIn)
    ) {
      router.push(redirectTo)
    }
  }, [session, redirectIfFoundUser, redirectTo])

  return { session, isLoading }
}
