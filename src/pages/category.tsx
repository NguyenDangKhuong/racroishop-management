import CategoryTable from '../components/CategoryTable'
import DashboardLayout from '../components/DashboardLayout'

const Category = () => {
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
