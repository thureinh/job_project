import Navbar from "@/components/dashboard/Navbar"
import Sidenav from "@/components/dashboard/Sidenav"
import Main from "@/components/dashboard/Main"

export default function AdminLayout() {
  return (
    <>
      <Navbar />
      <div id="layoutSidenav">
        <Sidenav />
        <Main />
      </div>
    </>
  )
}
