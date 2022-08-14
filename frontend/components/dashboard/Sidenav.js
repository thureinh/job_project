import Link from 'next/link'
export default function Sidenav() {
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Core</div>
                        <Link href="/dashboard">
                            <a className="nav-link" href="index.html">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </a>
                        </Link>
                        <Link href="/dashboard/location">
                            <a className="nav-link">
                                <div className="sb-nav-link-icon"><i className="fa fa-location-arrow"></i></div>
                                Locations
                            </a>
                        </Link>
                        <a className="nav-link">
                            <div className="sb-nav-link-icon"><i className="fas fa-bus-alt"></i></div>
                            Routes
                        </a>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Start Bootstrap
                </div>
            </nav>
        </div>
    )
}