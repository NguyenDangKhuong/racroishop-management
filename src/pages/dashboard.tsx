import DashboardLayout from '../components/DashboardLayout'
import Header from '../components/Header'
import useUser from '../hooks/useUser'

const Dashboard = () => {
  useUser({ redirectTo: '/login' })
  return (
    <DashboardLayout>
      <Header />
    </DashboardLayout>
  )
}

export default Dashboard
