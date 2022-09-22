import useAuth from '../../hooks/useAuth'
import PublicFooter from '../PublicFooter'
import PublicNavbar from '../PublicNavbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  useAuth({ redirectTo: '/dashboard', redirectIfFoundUser: true })
  return (
    <>
      <PublicNavbar />
      <div>{children}</div>
      <PublicFooter />
    </>
  )
}

export default Layout
