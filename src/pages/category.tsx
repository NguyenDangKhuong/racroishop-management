import CategoryTable from '../components/CategoryTable'
import DashboardLayout from '../components/DashboardLayout'
import useUser from '../hooks/useUser'

const Category = () => {
  useUser()
  return (
    <DashboardLayout>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full mb-12 px-4'>
          <CategoryTable />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Category
