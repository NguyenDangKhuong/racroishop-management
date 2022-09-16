import { useRouter } from 'next/router'
import LoadingPage from '../components/LoadingPage'
import useUser from '../hooks/useUser'
import checkAuth from '../utils/checkAuth'

const Index = () => {
  checkAuth(<div></div>)
}

export default Index
