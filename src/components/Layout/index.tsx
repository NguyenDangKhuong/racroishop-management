import PublicFooter from '../PublicFooter'
import PublicNavbar from '../PublicNavbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicNavbar />
      <>{children}</>
      <PublicFooter />
    </>
  )
}

export default Layout
