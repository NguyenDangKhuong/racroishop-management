import DashboardLayout from '../components/DashboardLayout'
import Header from '../components/Header'
import checkAuth from '../utils/checkAuth'

const Dashboard = () => {
  return checkAuth(<Header />)
}

export default Dashboard
