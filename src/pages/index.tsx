import Carousel from '../components/client/Carousel'
import Layout from '../components/client/Layout'
import ProductList from '../components/client/ProductList'

const Index = () => {
  return (
    <Layout>
      <Carousel />
      <div className='px-4 md:px-10 2xl:px-24 lg:py-0'>
        <ProductList />
      </div>
    </Layout>
  )
}

export default Index
