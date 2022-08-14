function Home() {

    return (
        <>
            <header className="page-header">
                <div className="container-fluid">
                    <h2 className="no-margin-bottom">Forms</h2>
                </div>
            </header>
            <div className="breadcrumb-holder container-fluid">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Locations</li>
                </ul>
            </div>
            <section className="forms">
                <div className="container-fluid my-3">
                    <div className="row bg-white has-shadow">
                        <div className="container my-3">
                            <button type="button" className="btn btn-success btn-lg d-block mb-4 ml-auto">
                                <i className="fas fa-plus-square"></i>&nbsp;Add Location</button>
                            <table id="location_table" className="table table-striped table-bordered" width="100%">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

Home.layout = 'adminLayout'
export default Home