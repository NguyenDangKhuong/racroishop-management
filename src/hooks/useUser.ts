import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { get } from '../utils/api'

export default function useUser({
  redirectTo = '',
  redirectIfFound = false
} = {}) {
  const router = useRouter()
  const { isLoading, data: user } = useQuery(
    ['fetchUser'],
    () => get(`/api/user/`).then(res => res.data)
  )

  return { session: user, isLoading }
}
