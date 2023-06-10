import CategoryTable from '../components/CategoryTable'
import DashboardLayout from '../components/DashboardLayout'
import LoaderIcon from '../components/LoaderIcon'
import { useCheckAuth } from '../hooks/useCheckAuth'

const Category = () => {
  const { status } = useCheckAuth()

  return status === 'loading' || status === 'unauthenticated' ? (
    <LoaderIcon />
  ) : (
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
