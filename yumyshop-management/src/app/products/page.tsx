import ProductTable from '@/components/dashboard/products/ProductTable'
import ProductTitle from '@/components/dashboard/products/ProductTitle'
import { get } from '@/utils/api'

const ProductPage = async () => {
  const dataProducts = await get(`api/products`, {
    page: '1',
    size: '20',
    name: '',
    isPublic: 'true'
  })
  const dataCategories = await get(`api/categories`)
  return (
    <>
      <ProductTitle totalDocs={dataProducts.totalDocs} />
      <ProductTable
        products={dataProducts.products}
        categories={dataCategories.categories}
      />
    </>
  )
}

export default ProductPage
