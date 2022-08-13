import Image from 'next/image'
import Link from 'next/link'
import AcceptImg from '@/public/images/accept.png'
export default function Home({ children }) {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 shadow fixed-top">
                <div className="container">
                    <a href="/" className="navbar-brand">
                        <Image src='/images/logo1.jpg' width={100} height={80} layout="fixed" />
                        Online MM Ticket
                    </a>
                    <div>

                    </div>
                    <button className="navbar-toggler" data-toggle="collapse" data-target="#myNav">
                        <span className="navbar-toggler-icon">
                        </span>
                    </button>
                    <div id="myNav" className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link href="/">
                                    <a className="nav-link">HOME</a>
                                </Link>
                            </li>
                            <li className="nav-item" id="routebtn"><a className="nav-link" href="#">ROUTE</a></li>
                            <li className="nav-item">
                                <Link href="/login">
                                    <a className="nav-link">LOGIN</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/dashboard">
                                    <a className="nav-link" href="">Dashboard</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {children}
            <footer className="site-footer text-light" style={{ backgroundCcolor: '#283747' }}>
                <div className="footer-widgets">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-4 mb-md-4 mb-lg-0">
                                <div className="foot-contact my-3">
                                    <h5>Contact</h5>
                                    <span style={{ color: '#808b96' }} ><i className="fa fa-phone mr-2"></i>09-761051414 </span>
                                    <br />
                                    <br />
                                    <h5>We accept</h5>
                                    <Image src={AcceptImg} />
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 my-3" id="information">
                                <h5>Information</h5>
                                <ul>
                                    <li><a href="/retrieve">Find/Print Your Ticket </a></li>
                                    <li><a href='/article/mpu-ecommerce'>How to open MPU Ecommerce </a></li>
                                    <li><a href='/article/how-to-buy-with-bank-transfer'>How to buy using bank transfer </a></li>
                                    <li><a href="/terms">Terms Conditions </a></li>
                                    <li><a href="/privacy">Privacy Policy </a></li>
                                </ul>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 my-3" id="btninfo">
                                <h5>Online MM Ticket</h5>
                                <ul>
                                    <li><a href="index.html">HOME</a></li>
                                    <li><a href="#gallery">GALLERY</a></li>
                                    <li><a href="">CONTACT</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bar" style={{ backgroundColor: '#17202a', height: '50px' }}>
                    <div className="container text-center" style={{ padding: 'auto' }}>
                        <p className="m-0 py-2">
                            &copy; 2019 Online MM Ticket
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}