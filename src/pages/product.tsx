import DashboardLayout from '../components/DashboardLayout'
import ProductTable from '../components/ProductTable'
import checkAuth from '../utils/checkAuth'

const ProductPage = () => {
  return checkAuth(
    <div className='flex flex-wrap mt-4'>
      <div className='w-full mb-12 px-4'>
        <ProductTable />
      </div>
    </div>
  )
}

export default ProductPage
