import Image from 'next/image'
export default function Main() {
    return (
        <>
            <div className="container booking">
                <div className="row">
                    <div className="col-md-8 my-1">
                        <div className="card text-center home">
                            <div className="card-body shadow">
                                <form method="post" name="mainform" className="form">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label >Leaving From</label>
                                            <select className="form-control" id="leavingfrom" required="required" name="leavingfrom">
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label >Going To</label>
                                            <select className="form-control" id="goingto" required="required" name="goingto">
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label >Depature Date</label>
                                            <input type="text" name="date" id="depaturedate" className="form-control" placeholder="Pick a Date" required="required" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label >Number of Seats</label>
                                            <select className="form-control" id="noseats" required="required" name="noseats">
                                                <option disabled="disabled">Select</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label >Nationality</label>
                                            <select className="form-control" id="nationality" required="required" name="nationality">
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="text-light">.</label>
                                            <button className="btn btn-outline-info form-control" id="submit" type="submit">Search Now</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="card col-md-4 my-1 poster shadow">
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>

                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item">
                                    <div className="d-block w-100">
                                        <Image src="/images/visa.png" width={500} height={500} layout="responsive" />
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="d-block w-100">
                                        <Image src="/images/paypal.jpg" width={500} height={500} layout="responsive" />
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="d-block w-100">
                                        <Image src="/images/wave1.jpg" width={500} height={500} layout="responsive" />
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="d-block w-100">
                                        <Image src="/images/okdollor.jpg" width={500} height={500} layout="responsive" />
                                    </div>
                                </div>
                                <div className="carousel-item active">
                                    <div className="d-block w-100">
                                        <Image src="/images/cb1.jpg" width={500} height={500} layout="responsive" />
                                    </div>
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only"></span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid service">
                <hr />
                <div className="row">
                    <div className="col-md-3 text-center">
                        <h1 className="text-info"><i className="fas fa-bus-alt"></i></h1>
                        <h4>50+ Bus Operators</h4>
                        <p>Choose from 50+ major bus operators covering 200 destinations.</p>
                    </div>
                    <div className="col-md-3 text-center">
                        <h1 className="text-info"><i className="fas fa-stopwatch"></i></h1>
                        <h4>Instant Time</h4>
                        <p>Book your trip in less than 5 min. Instant confirmation after payment.</p>
                    </div>
                    <div className="col-md-3 text-center">
                        <h1 className="text-info"><i className="fas fa-shield-alt"></i></h1>
                        <h4>Secure Payment</h4>
                        <p>Pay with VISA, MASTER, MPU, WaveMoney, KBZPay, MAB, and CBPay.</p>
                    </div>
                    <div className="col-md-3 text-center">
                        <h1 className="text-info"><i className="far fa-question-circle"></i></h1>
                        <h4>Help</h4>
                        Our support center is available 24/7 for your questions and concerns.
                    </div>
                </div>
                <hr />
            </div>
            <div className="container my-5 text-center" id="route">
                <h4 className="my-3">Popular Routes</h4>
                <hr className="divider mb-5" />
                <div className="row">
                    <div className="col-md-3">
                        <div className="card shadow my-1">
                            <div className="card-body" style={{ padding: 0, margin: 0 }}>
                                <div className="d-block w-100 h-100">
                                    <Image src="/images/mandalay.jpg" width={500} height={500} layout="responsive" />
                                </div>
                            </div>
                            <div className="card-footer popular">
                                <a href="" className="btn">Yangon-Mandalay</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card shadow my-1">
                            <div className="card-body" style={{ padding: 0, margin: 0 }}>
                                <div className="d-block w-100 h-100">
                                    <Image src="/images/naypyithaw.jpg" width={500} height={500} layout="responsive" />
                                </div>
                            </div>
                            <div className="card-footer popular">
                                <a href="" className="btn">Yangon-Naypyitaw</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card shadow my-1">
                            <div className="card-body" style={{ padding: 0, margin: 0 }}>
                                <div className="d-block w-100 h-100">
                                    <Image src="/images/yangon.jpg" width={500} height={500} layout="responsive" />
                                </div>
                            </div>
                            <div className="card-footer popular">
                                <a href="" className="btn">Mandalay-Yangon</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card shadow my-1">
                            <div className="card-body" style={{ padding: 0, margin: 0 }}>
                                <div className="d-block w-100 h-100">
                                    <Image src="/images/b1.jpg" width={500} height={500} layout="responsive" />
                                </div>
                            </div>
                            <div className="card-footer popular">
                                <a href="" className="btn">Mandalay-Bagan</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-center my-3" id="gallery">
                <h4>Gallery</h4>
                <hr className="divider" />
                <div className="row">
                    <div className="col-md-4 my-1">
                        <div className="card shadow">
                            <div className="d-block w-100 h-50">
                                <Image src="/images/car1.jpg" width={500} height={500} layout="responsive" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 my-1">
                        <div className="card shadow">
                            <div className="d-block w-100 h-50">
                                <Image src="/images/car2.jpg" width={500} height={500} layout="responsive" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 my-1">
                        <div className="card shadow">
                            <div className="d-block w-100 h-50">
                                <Image src="/images/car3.jpg" width={500} height={500} layout="responsive" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 my-1">
                        <div className="card shadow">
                            <div className="d-block w-100 h-50">
                                <Image src="/images/car4.jpg" width={500} height={500} layout="responsive" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 my-1">
                        <div className="card shadow">
                            <div className="d-block w-100 h-50">
                                <Image src="/images/car5.jpg" width={500} height={500} layout="responsive" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 my-1">
                        <div className="card shadow">
                            <div className="d-block w-100 h-50">
                                <Image src="/images/car6.jpg" width={500} height={500} layout="responsive" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}