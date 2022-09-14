import { useRouter } from 'next/router'
import LoadingPage from '../components/LoadingPage'
import useUser from '../hooks/useUser'

const Index = () => {
  const router = useRouter()
  const { session, isLoading } = useUser()

  console.log(session)
  console.log(isLoading)
  if (isLoading) {
    return <LoadingPage />
  }
  if (!session || !session?.isLoggedIn) {
    return router.push('/login')
  }
  return session.isAdmin ? router.push('/dashboard') : router.push('/')
}

export default Index
