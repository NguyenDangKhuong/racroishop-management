import Layout from '../components/Layout'
import useUser from '../hooks/useUser'

const Index = () => {
  useUser({ redirectTo: '/login' })
  return <Layout>aaaloading...</Layout>
}

export default Index
