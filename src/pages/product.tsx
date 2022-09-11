import ProductTable from '../components/ProductTable'
import checkAuthWithAdminLayout from '../utils/checkAuthWithAdminLayout'

const Product = () => {
  return (
    <>
      {checkAuthWithAdminLayout(
        <div className='flex flex-wrap mt-4'>
          <div className='w-full mb-12 px-4'>
            <ProductTable />
          </div>
        </div>
      )}
    </>
  )
}

export default Product
