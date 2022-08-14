import LocationTable from "../location/Table"
export default function Main() {
    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Tables</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li className="breadcrumb-item active">Tables</li>
                </ol>
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1"></i>
                        Location Table
                    </div>
                    <div className="card-body">
                    </div>
                </div>
            </div>
        </>
    )
}