import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import ProductTable from '../components/ProductTable'

const ProductPage = () => {
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
            <ProductTable />
          </div>
        </div>
      </DashboardLayout>
    )
  }
}

export default ProductPage
