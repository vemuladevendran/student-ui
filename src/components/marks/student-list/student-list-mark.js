import axios from "axios";
import { useEffect, useState } from "react";
import AddMarks from "../add-marks/add-marks";




function StudentListMarks(props) {

    const tableData = Array(10).fill('');

    const [openAddMarks, setOpenAddMarks] = useState(false);


    const openAddMarksDialog = () => {
        setOpenAddMarks(true);
    }

    const closeModal = () => {
        setOpenAddMarks(false);
    };


    const getStudentData = async () => {
        try {
            // console.log(props.match.params)
            const queryDetails = {
                branch: 'Information Technology',
                currentStudingyear: 'First Year',
            }
            const data = await axios.get(`http://localhost:3000/api/v1/student`, { params: queryDetails });
            console.log(data);
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
                                tableData?.map(x => {
                                    return (
                                        <tr key={Math.random()}>
                                            <th scope="row">1</th>
                                            <td>2019PECIT248</td>
                                            <td>211419205038</td>
                                            <td>Devendran V</td>
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


export default StudentListMarks