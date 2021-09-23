import { Dialog } from "@material-ui/core";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";




function ViewCircularReports(props) {

    const [dialoData, setDialogData] = useState();

    const getData = () => {
        const data = props.data;
        setDialogData(data);
    }

    useEffect(() => {
        getData();
    })
    return (
        <Dialog open={props.open}>
            <div className="container">
                <div className="row p-5">
                    <div className="col-12">
                        <div className="mb-3">
                            <span className="fw-bold h4 text-center m-0">{dialoData?.reportTitle || dialoData?.circularTitle}</span>
                            <span className="me-3 fw-bold text-uppercase text-primary"> {dialoData?.studentRollNumber || `${dialoData?.circularFor} Departement`}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="mx-3">Data <span className="fw-bold">{dateFormat(dialoData?.reportDate || dialoData?.circularDate, 'mmm d, yyyy')}</span></p>
                            <p className="mx-3">Created By <span className="fw-bold">{dialoData?.createdBy}</span></p>
                        </div>
                        <p className="row">{dialoData?.reportContent || dialoData?.circularContent}</p>

                        <div className="mt-3 d-flex justify-content-center">
                            <button className="btn btn-primary px-4" onClick={props.closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default ViewCircularReports;
