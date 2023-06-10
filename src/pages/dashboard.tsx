import DashboardLayout from '../components/DashboardLayout'
import Header from '../components/Header'
import LoaderIcon from '../components/LoaderIcon'
import { useCheckAuth } from '../hooks/useCheckAuth'

const Dashboard = () => {
  const { status } = useCheckAuth()

  return status === 'loading' || status === 'unauthenticated' ? (
    <LoaderIcon />
  ) : (
    <DashboardLayout>
      <Header />
    </DashboardLayout>
  )
}

export default Dashboard
