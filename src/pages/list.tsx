import DashboardLayout from '../components/DashboardLayout'
import LoaderIcon from '../components/LoaderIcon'
import OrderTable from '../components/OrderTable'
import { useCheckAuth } from '../hooks/useCheckAuth'

const ListPage = () => {
  const { status } = useCheckAuth()

  return status === 'loading' || status === 'unauthenticated' ? (
    <LoaderIcon />
  ) : (
    <DashboardLayout>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full mb-12 px-4'>
          <OrderTable />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ListPage
