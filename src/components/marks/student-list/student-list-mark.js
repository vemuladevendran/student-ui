import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import AddMarks from "../add-marks/add-marks";
import CommonAlert from "../../../common-models/common-alert/nodatafound-alert";



function StudentListMarks(props) {


    const [openAddMarks, setOpenAddMarks] = useState(false);
    const [studentlist, setStudentList] = useState()
    const [filterdetails, setFilterDetails] = useState();
    const [selectedStudent, setSelectedStudent] = useState();
    const [ErrorDialog, setErrorDialog] = useState(true);
    const [subjects, setSubjects] = useState();
    const getSubjects = async () => {
        try {
            const data = await axios.get(`http://localhost:3000/api/v1/subjects/${props.match.params.branch}/${props.match.params.semester}`);
            console.log(data.data);
            setSubjects(data?.data);
        } catch (error) {
            console.error(error);
        }
    }

    //  opening and closing addmarks details

    const openAddMarksDialog = (student) => {
        setSelectedStudent(student);
        setOpenAddMarks(true);
    }

    const closeModal = () => {
        setOpenAddMarks(false);
    };

    // close error dialog

    const errorDialog = () => {
        props.history.goBack();
        setErrorDialog(false);
    }


    const getStudentData = async () => {
        try {


            const queryDetails = {
                branch: props.match.params.branch,
                currentStudingyear: props.match.params.currentStudingyear,
                semester: props.match.params.semester
            }
            setFilterDetails(queryDetails);

            const data = await axios.get(`http://localhost:3000/api/v1/student/${queryDetails.branch}/${queryDetails.currentStudingyear}`);
            setStudentList(data.data);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getStudentData();
        getSubjects();
    }, [])


    return (
        <div className="container">
            {/* no data fond alert */}
            {
                studentlist?.length === 0 ? (
                    <CommonAlert open={ErrorDialog} closeModal={errorDialog} errorMessage = {`No Student Found Please Select Another Department`}></CommonAlert>
                ) : null
            }
            <div className="row">
                <div className="col-12 table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">RollNumber</th>
                                <th scope="col">ExamNumber</th>
                                <th scope="col">Name</th>
                                <th scope="col">Add Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                studentlist?.map((x, i) => {
                                    return (
                                        <tr key={Math.random()}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{x?.rollNumber}</td>
                                            <td>{x?.examNumber}</td>
                                            <td>{`${x?.firstName} ${x?.lastName}`}</td>
                                            <td className="text-center">
                                                <button type="button" className="btn btn-primary" onClick={() => {
                                                    openAddMarksDialog(x)
                                                }}>
                                                    <i className="bi bi-plus-circle-fill"></i> Add Marks
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
                {/* add marks dialog */}
                <div>
                    {

                        studentlist?.length !== 0 ? (<AddMarks open={openAddMarks} closeModal={closeModal} filterdetails={filterdetails} student={selectedStudent} subjects={subjects} ></AddMarks>) : null
                    }
                </div>
            </div>
        </div>
    );
}


export default withRouter(StudentListMarks)