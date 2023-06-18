import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Carousel from '../components/client/Carousel'
import Layout from '../components/client/Layout'
import ProductList from '../components/client/ProductList'

type Props = {
  // Add custom props here
}

const Index = () =>
  // _props: InferGetStaticPropsType<typeof getStaticProps>
  {
    return (
      <Layout>
        <Carousel />
        <div className='px-4 md:px-10 2xl:px-24 lg:py-0'>
          <ProductList />
        </div>
      </Layout>
    )
  }

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['index', 'common']))
  }
})

export default Index
