import DashboardLayout from '../components/DashboardLayout'
import OrderTable from '../components/OrderTable'

const ListPage = () => {
  return (
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
