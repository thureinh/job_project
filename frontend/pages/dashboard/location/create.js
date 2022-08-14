import Image from 'next/image'
function Create() {
    return (
        <>
            <header className="page-header">
                <div className="container-fluid">
                    <h2 className="no-margin-bottom">Forms</h2>
                </div>
            </header>
            <div className="breadcrumb-holder container-fluid">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="{{ route('dashboard') }}">Create</a></li>
                    <li className="breadcrumb-item"><a href="{{ route('locations.index') }}">Location</a></li>
                    <li className="breadcrumb-item active">Create</li>
                </ul>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header d-flex align-items-center">
                                <h3 className="h4">Create Location Form</h3>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-center mb-3">
                                    <Image
                                        src="/static/images/default-placeholder-200x200.png"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                <form className="form-horizontal">
                                    <div className="form-group row">
                                        <label className="col-sm-3 form-control-label">File input</label>
                                        <div className="col-sm-9">
                                            <input id="fileInput" name="image" type="file" className="form-control-file" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 form-control-label">Location Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="location_name_eng" className="form-control" /><small className="help-block-none">Write location name in English</small>
                                        </div>
                                    </div>
                                    <div className="line"></div>
                                    <div className="form-group row">
                                        <div className="col-sm-4 offset-sm-3">
                                            <a className="btn btn-secondary">Back</a>
                                            <button type="submit" className="btn btn-primary">Add Location</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
Create.layout = 'adminLayout'
export default Create