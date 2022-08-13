import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand ps-3" href="index.html">Start Bootstrap</a>
            <Link href="/">
                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle">
                    <i className="fas fa-home"></i>
                    Back To Home
                </button>
            </Link>
        </nav>
    )
}