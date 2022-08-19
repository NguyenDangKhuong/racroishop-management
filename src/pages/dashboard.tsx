import Header from '../components/Header'
import { renderPageWithLayout } from '../utils/renderPageWithLayout'

const Dashboard = () => {
  return <>{renderPageWithLayout(<Header />)}</>
}

export default Dashboard