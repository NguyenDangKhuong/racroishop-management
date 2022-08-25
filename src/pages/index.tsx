import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LoadingPage from '../components/LoadingPage'

const Index = () => {
  const { status } = useSession()
  const router = useRouter()
  if (status === 'loading') {
    return <LoadingPage />
  }
  if (status === 'unauthenticated') router.push('/login')
  if (status === 'authenticated') router.push('/dashboard')
}

export default Index
