import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import AddMarks from "../add-marks/add-marks";
import CommonAlert from "../../../common-models/common-alert/nodatafound-alert";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function StudentListMarks(props) {
  const [successMessage, setSuccessMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openAddMarks, setOpenAddMarks] = useState(false);
  const [studentlist, setStudentList] = useState();
  const [filterdetails, setFilterDetails] = useState();
  const [selectedStudent, setSelectedStudent] = useState();
  const [ErrorDialog, setErrorDialog] = useState(true);
  const [subjects, setSubjects] = useState();

  // open snakbar
  const openSnackbar = () => {
    setOpen(true);
  };
  // close snakbar
  const closeSnackbar = () => {
    setOpen(false);
  };

  const marksSuccessMessage = () => {
    setSuccessMessage("Marks Added Successful");
    openSnackbar();
  };

  const getSubjects = async () => {
    try {
      const data = await axios.get(
        `http://localhost:5000/api/v1/subjects/${props.match.params.branch}/${props.match.params.semester}`
      );
      console.log(data.data);
      setSubjects(data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  //  opening and closing addmarks details

  const openAddMarksDialog = (student) => {
    setSelectedStudent(student);
    setOpenAddMarks(true);
  };

  const closeModal = () => {
    setOpenAddMarks(false);
  };

  // close error dialog

  const errorDialog = () => {
    props.history.goBack();
    setErrorDialog(false);
  };

  const getStudentData = async () => {
    try {
      const queryDetails = {
        branch: props.match.params.branch,
        currentStudingYear: props.match.params.currentStudingYear,
        semester: props.match.params.semester,
        examName: props.match.params.examName,
      };
      setFilterDetails(queryDetails);
      const data = await axios.get(
        `http://localhost:5000/api/v1/student/${queryDetails.branch}/${queryDetails.currentStudingYear}`
      );
      setStudentList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStudentData();
    getSubjects();
  }, []);

  return (
    <div className="container">
      {/* no data fond alert */}
      {studentlist?.length === 0 ? (
        <CommonAlert
          open={ErrorDialog}
          closeModal={errorDialog}
          errorMessage={`No Student Found Please Select Another Department`}
        ></CommonAlert>
      ) : null}
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
              {studentlist?.map((x, i) => {
                return (
                  <tr key={Math.random()}>
                    <th scope="row">{i + 1}</th>
                    <td>{x?.rollNumber}</td>
                    <td>{x?.examNumber}</td>
                    <td>{`${x?.firstName} ${x?.lastName}`}</td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          openAddMarksDialog(x);
                        }}
                      >
                        <i className="bi bi-plus-circle-fill"></i> Add Marks
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* add marks dialog */}
        <div>
          {studentlist?.length !== 0 ? (
            <AddMarks
              open={openAddMarks}
              closeModal={closeModal}
              successMessage={marksSuccessMessage}
              filterdetails={filterdetails}
              student={selectedStudent}
              subjects={subjects}
            ></AddMarks>
          ) : null}
        </div>
      </div>
      {/* snakbar */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={successMessage}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closeSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </div>
  );
}

export default withRouter(StudentListMarks);
