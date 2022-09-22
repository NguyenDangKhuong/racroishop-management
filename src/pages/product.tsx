import DashboardLayout from '../components/DashboardLayout'
import ProductTable from '../components/ProductTable'

const ProductPage = () => {
  return (
    <DashboardLayout>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full mb-12 px-4'>
          <ProductTable />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ProductPage
