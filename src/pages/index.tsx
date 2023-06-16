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
      <div className='px-4 md:px-10 2xl:px-24 lg:py-0'>
        <ProductList />
      </div>
    </Layout>
  )
}



export default Index
