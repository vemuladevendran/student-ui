import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import AddMarks from "../add-marks/add-marks";




function StudentListMarks(props) {


    const [openAddMarks, setOpenAddMarks] = useState(false);
    const [studentlist, setStudentList] = useState()

    const openAddMarksDialog = () => {
        setOpenAddMarks(true);
    }

    const closeModal = () => {
        setOpenAddMarks(false);
    };


    const getStudentData = async () => {
        try {
            const queryDetails = {
                branch: props.match.params.branch,
                currentStudingyear: props.match.params.currentStudingyear,
            }
            const data = await axios.get(`http://localhost:3000/api/v1/student`, { params: queryDetails });
            console.log(data.data)
            setStudentList(data.data);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getStudentData();
    }, [])


    return (
        <div className="container">
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
                                studentlist?.map((x, i)=> {
                                    return (
                                        <tr key={Math.random()}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{x?.rollNumber}</td>
                                            <td>{x?.examNumber}</td>
                                            <td>{`${x?.firstName} ${x?.lastName}`}</td>
                                            <td className="text-center">
                                                <button type="button" className="btn btn-primary" onClick={openAddMarksDialog}>
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
                    <AddMarks open={openAddMarks} closeModal={closeModal} ></AddMarks>
                </div>
            </div>
        </div>
    );
}


export default withRouter(StudentListMarks)