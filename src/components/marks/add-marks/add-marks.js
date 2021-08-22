import { Dialog } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from "react";


function AddMarks(props) {
    const [filterdetails, setFilterDetails] = useState();
    const [selectedStudent, setSelectedStudent] = useState();
    const [subjects, setSubjects] = useState();
    useEffect(() => {
        setFilterDetails(props?.filterdetails);
    }, [])

    useEffect(() => {
        setSelectedStudent(props?.student);
        setSubjects(props?.subjects);
    })


    return (
        <Dialog open={props.open}>
            <div className="container p-5">
                <form className="row">
                    <div className="col-12">
                        <h4 className="fw-bold text-center">Enter Marks</h4>
                        <div className="d-flex justify-content-between">
                            <p className="fw-bold text-primary">{selectedStudent?.firstName}</p>
                            <p className="fw-bold text-primary">{selectedStudent?.rollNumber}</p>
                        </div>
                        {
                            subjects?.map(x => {
                                return (
                                    <div key={Math.random()} className="row align-items-center">
                                        <span className="fw-bold me-2">{x}</span>
                                        <TextField id="outlined-basic" type="number" InputProps={{ inputProps: { min: 0, max: 100 } }} label="Enter marks" name="" variant="outlined" className="w-100 my-3" required />
                                    </div>
                                );
                            })
                        }

                        {/* button section */}
                        <div>
                            <div className="m-2">
                                <button className="btn btn-secondary w-100" type="button" onClick={props.closeModal}>Close</button>
                            </div>
                            <div className="m-2">
                                <button className="btn btn-primary w-100">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}


export default AddMarks;