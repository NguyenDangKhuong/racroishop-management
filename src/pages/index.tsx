import LoaderIcon from '../components/LoaderIcon'
import Carousel from '../components/client/Carousel'
import Layout from '../components/client/Layout'
import ProductList from '../components/client/ProductList'
import { useCheckAuth } from '../hooks/useCheckAuth'

const Index = () => {
  const { status } = useCheckAuth()

  return status === 'loading' || status === 'unauthenticated' ? (
    <LoaderIcon />
  ) : (
    <Layout>
      <Carousel />
      <ProductList />
    </Layout>
  )
}



export default Index
