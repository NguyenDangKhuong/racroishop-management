/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import LoadingPage from '../components/LoadingPage'
import useUser from '../hooks/useUser'

export const renderPageWithLayout = (children: JSX.Element) => {
  const router = useRouter()
  const { session, isLoading } = useUser()

  if (session?.isLoading) {
    return <LoadingPage />
  }
  if (!session?.isAdmin) {
    return <LoadingPage />
  }
  if (!session?.isLoggedIn) {
    return router.push('/login')
  }
  return <Layout>{children}</Layout>
}
