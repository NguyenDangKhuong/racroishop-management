import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Carousel from '../components/client/Carousel'
import Layout from '../components/client/Layout'

const Index = () => {
  const { status, data } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/signin')
  }, [status])

  if (status === 'authenticated') {
    return (
      <Layout>
        <Carousel />
      </Layout>
    )
  }
}

export default Index
