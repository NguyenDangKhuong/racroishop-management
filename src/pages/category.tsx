import CategoryTable from '../components/CategoryTable'
import checkAuth from '../utils/checkAuth'

const Category = () => {
  return checkAuth(
    <div className='flex flex-wrap mt-4'>
      <div className='w-full mb-12 px-4'>
        <CategoryTable />
      </div>
    </div>
  )
}

export default Category
