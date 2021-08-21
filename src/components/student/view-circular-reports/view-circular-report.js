import { Dialog } from "@material-ui/core";




function ViewCircularReports(params) {
    

    return(
        <Dialog>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="fw-bold text-center">Title <span>INFORMATION TECHNOLOGY</span></h3>
                        <div className="d-flex justify-content-between">
                        <p>Data <span>27/08</span></p>
                        <p>Created By <span>Deva</span></p>
                        <p>Report content</p>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default ViewCircularReports;
