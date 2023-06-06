import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import Header from '../components/Header'

const Dashboard = () => {
  const { status, data } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/signin')
  }, [status])

  if (status === 'authenticated') {
    return (
      <DashboardLayout>
        <Header />
      </DashboardLayout>
    )
  }
}

export default Dashboard
