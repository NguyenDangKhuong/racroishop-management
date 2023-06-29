import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Carousel from '../components/client/Carousel'
import Layout from '../components/client/Layout'
import ProductList from '../components/client/ProductList'
import { Product } from '../models/Product'
import { get } from '../utils/api'

type Props = {
  products: Product[]
}

const Index = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Carousel />
      <div className='px-4 md:px-10 2xl:px-24 lg:py-0'>
        <ProductList products={props.products} />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const localeProps = {
    ...(await serverSideTranslations(locale ?? 'en', ['index', 'common']))
  }
  try {
    const products = await get(
      `/api/products?page=${1}&size=${30}&name=&isPublic=${true}`
    ).then(res => res.data.products || [])

    return {
      props: {
        ...localeProps,
        products
      }
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        ...localeProps,
        products: []
      }
    }
  }
}

export default Index
