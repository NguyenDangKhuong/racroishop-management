/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router'
import DashboardLayout from '../components/DashboardLayout'
import LoadingPage from '../components/LoadingPage'
import useUser from '../hooks/useUser'

const checkAuthWithAdminLayout = (children: JSX.Element) => {
  const router = useRouter()
  const { session, isLoading } = useUser()

  if (isLoading) {
    return <LoadingPage />
  }
  if (!session?.isAdmin) {
    return <LoadingPage />
  }
  if (!session?.isLoggedIn) {
    return router.push('/login')
  }
  return <DashboardLayout>{children}</DashboardLayout>
}
export default checkAuthWithAdminLayout
