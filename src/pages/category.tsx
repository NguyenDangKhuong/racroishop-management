import CategoryTable from '../components/CategoryTable'
import checkAuthWithAdminLayout from '../utils/checkAuthWithAdminLayout'

const Category = () => {
  return (
    <>
      {checkAuthWithAdminLayout(
        <div className='flex flex-wrap mt-4'>
          <div className='w-full mb-12 px-4'>
            <CategoryTable />
          </div>
        </div>
      )}
    </>
  )
}

export default Category
