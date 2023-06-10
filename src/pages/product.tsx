import DashboardLayout from '../components/DashboardLayout'
import LoaderIcon from '../components/LoaderIcon'
import ProductTable from '../components/ProductTable'
import { useCheckAuth } from '../hooks/useCheckAuth'

const ProductPage = () => {
  const { status } = useCheckAuth()

  return status === 'loading' || status === 'unauthenticated' ? (
    <LoaderIcon />
  ) : (
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
