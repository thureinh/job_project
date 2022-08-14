import Link from 'next/link'
import { useRouter } from 'next/router'
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'

export default function Navbar() {
    const { user, mutateUser } = useUser()
    const router = useRouter()

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand ps-3" >Bus Ticket</a>
            <Link href="/">
                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle">
                    <i className="fas fa-home"></i>
                    Back To Home
                </button>
            </Link>
            <div className="d-flex ml-auto text-white">
                <button type="button"
                    onClick={async (e) => {
                        e.preventDefault()
                        mutateUser(
                            await fetchJson('/api/logout', { method: 'POST' }),
                            false
                        )
                        router.push('/')
                    }}
                    className="btn btn-dark">
                    Log out
                </button>
            </div>
        </nav>
    )
}