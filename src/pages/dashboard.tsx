import Header from '../components/Header'
import checkAuthWithAdminLayout from '../utils/checkAuthWithAdminLayout'

const Dashboard = () => {
  return <>{checkAuthWithAdminLayout(<Header />)}</>
}

export default Dashboard