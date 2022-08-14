import Navbar from "@/components/dashboard/Navbar"
import Sidenav from "@/components/dashboard/Sidenav"
import useUser from 'lib/useUser'

export default function AdminLayout({ children }) {
  const { user } = useUser({
    redirectTo: '/login',
  })
  return (
    <>
      <Navbar />
      <div id="layoutSidenav">
        <Sidenav />
        <div id="layoutSidenav_content">
          <main>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
