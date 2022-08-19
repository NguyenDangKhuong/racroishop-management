import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import LoadingPage from '../components/LoadingPage'

export const renderPageWithLayout = (children: JSX.Element) => {
  const { status } = useSession()
  const router = useRouter()
  if (status === "loading") {
    return <LoadingPage />
  }
  if (status === 'unauthenticated') router.push('/login')
  return <Layout>{children}</Layout>
}
