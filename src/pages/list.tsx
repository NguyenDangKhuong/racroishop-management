import ListTable from '../components/ListTable'
import checkAuth from '../utils/checkAuth'

const ListPage = () => {
  return checkAuth(
    <div className='flex flex-wrap mt-4'>
      <div className='w-full mb-12 px-4'>
        <ListTable />
      </div>
    </div>
  )
}

export default ListPage
