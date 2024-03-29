import Footer from '../Footer'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      <div className='md:ml-64'>
        <Navbar />
        <div className='px-4 md:px-10 mx-auto w-full -m-24 pt-20 md:pt-32 select-none'>
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default DashboardLayout
