import OrderTable from '../components/OrderTable'
import checkAuth from '../utils/checkAuth'

const ListPage = () => {
  return checkAuth(
    <div className='flex flex-wrap mt-4'>
      <div className='w-full mb-12 px-4'>
        <OrderTable />
      </div>
    </div>
  )
}

export default ListPage
