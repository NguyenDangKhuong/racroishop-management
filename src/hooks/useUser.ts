import { useQuery } from '@tanstack/react-query'
import { get } from '../utils/api'

export default function useUser({
  redirectTo = '',
  redirectIfFound = false
} = {}) {
  const { isLoading, data: user } = useQuery(['fetchUser'], () =>
    get(`/api/user/`).then(res => res.data)
  )

  return { session: user, isLoading }
}
