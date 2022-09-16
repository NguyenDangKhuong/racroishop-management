/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router'
import DashboardLayout from '../components/DashboardLayout'
import Layout from '../components/Layout'
import LoadingPage from '../components/LoadingPage'
import useUser from '../hooks/useUser'

const checkAuth = (children: JSX.Element) => {
  const router = useRouter()
  const { session, isLoading } = useUser()

  if (isLoading) {
    return <LoadingPage />
  }
  if (!session || !session?.isLoggedIn) {
    return router.push('/login')
  }
  return session.isAdmin ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    <Layout>{children}</Layout>
  )
}
export default checkAuth
