import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import OrderTable from '../components/OrderTable'

const ListPage = () => {
  const { status, data } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/signin')
  }, [status])

  if (status === 'authenticated') {
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
}

export default ListPage
