import PublicFooter from '../PublicFooter'
import PublicNavbar from '../PublicNavbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicNavbar />
      <div>{children}</div>
      <PublicFooter />
    </>
  )
}

export default Layout