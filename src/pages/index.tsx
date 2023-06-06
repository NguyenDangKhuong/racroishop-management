import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Layout from '../components/Layout'

const Index = () => {
  const { status, data } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/signin')
  }, [status])

  if (status === 'authenticated') {
    return <Layout>loading...</Layout>
  }
}

export default Index
