import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import IconButton from "@material-ui/core/IconButton";
import Loader from "../../loader/loader";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { NavLink, withRouter } from "react-router-dom";
import TokenServe from "../../../service/token/token";
import * as studentServe from '../../../service/http/student'
function ViewStudent(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoaderStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState();
  const [student, setStudent] = useState();
  // getting token data
  const getTokenData = () => {
    const token = TokenServe.getToken();
    const data = TokenServe.getTokenPayloadData(token);
    setIsAdmin(data.isAdmin);
  };

  // delete student
  const deleteStudent = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await studentServe.deleteStudent(id)
        props.history.goBack();
      } catch (error) {
        console.log(error, "fail to delete");
      }
    }
  };

  const getStudentDetails = async () => {
    try {
      setLoaderStatus(true);
      const studentId = props?.match?.params?.id;
      const student = await studentServe.getStudentById(studentId);
      console.log(student.data);
      setStudent(student.data);
      setLoaderStatus(false);
    } catch (error) {
      //  showing error message
      const errorMessage = error?.response.data.message;
      console.error(errorMessage);
      setErrorMessage(errorMessage);
      openSnackbar();
      // finally changing the loader status
      setLoaderStatus(false);
    }
  };

  // open snakbar
  const openSnackbar = () => {
    setOpen(true);
  };
  // close snakbar
  const closeSnackbar = () => {
    setOpen(false);
  };

  useEffect(() => {
    getStudentDetails();
    getTokenData();
  }, []);

  return (
    <div className="container-fluid">
      {/* loader */}
      {loader === true ? <Loader></Loader> : null}
      <div className="row">
        {/* personal details */}
        <div className="col-12 col-lg-6">
          {/* profile image */}
          <div className="row shadow-lg p-3 w-100 m-0">
            <h2 className="text-center">Personal Details</h2>
            <div className="col-12 col-md-6 col-lg-8 d-flex flex-column justify-content-center align-items-center">
              <p className="fw-bold h5 text-uppercase">{`${student?.firstName} ${student?.lastName}`}</p>
              <p>{student?.rollNumber}</p>
              <p>{student?.branch}</p>
              <p className="fw-bold">ADDRESS</p>
              <p>{student?.address}</p>
              {/* button section */}
              <div
                className="btn-group my-1"
                role="group"
                aria-label="Basic mixed styles example"
              >
                <button type="button" className="btn btn-success">
                  Share
                </button>
                <NavLink type="button" className="btn btn-warning"  to={`../../create-report/${student?.id}`}>
                  Report
                </NavLink>
                {isAdmin === "true" ? (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      deleteStudent(student?.id);
                    }}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <img
                src={`${student?.photo || "/assets/default-profile.png"}`}
                alt="profile"
                className="w-100"
              />
            </div>
            {/* lastupdate details */}
            <div className="d-md-flex justify-content-between mt-3">
              <p>
                Created By : <span>{student?.createdBy}</span>
              </p>
              <p>
                LastUpdate : <span>{student?.lastUpdate}</span>
              </p>
            </div>
          </div>
          {/* contact details */}
          <div className="shadow-lg p-4 bg-white overflow-auto mt-4">
            <p className="h5 fw-bold mt-4">
              Email : <span className="text-info">{student?.email}</span>
            </p>
            <p className="h5 fw-bold mt-4">
              Gender : <span className="text-info">{student?.gender}</span>
            </p>
            <p className="h5 fw-bold mt-4">
              Mobile :{" "}
              <span className="text-info">{student?.mobileNumber}</span>
            </p>
            <p className="h5 fw-bold mt-4">
              DOB : <span className="text-info">{student?.dob}</span>
            </p>
            <p className="h5 fw-bold mt-4">
              Father's Name :{" "}
              <span className="text-info">{student?.fatherName}</span>
            </p>
            <p className="h5 fw-bold mt-4">
              Mother's Name :{" "}
              <span className="text-info">{student?.motherName}</span>
            </p>
          </div>
        </div>
        {/* education details */}
        <div className="col-12 col-lg-6 shadow-lg p-3 bg-white mt-3 m-lg-0">
          <h2 className="text-center">Education Details</h2>
          <p className="h5 fw-bold mt-4">
            Year of 10th Passout :{" "}
            <span className="text-info">{student?.yearOf10}</span>
          </p>
          <p className="h5 fw-bold mt-4">
            Year of 12th Passout :{" "}
            <span className="text-info">{student?.yearOf12}</span>
          </p>
          <p className="h5 fw-bold mt-4">
            10th Mark Percentage:{" "}
            <span className="text-info">{student?.markPercentageOf10}</span>
          </p>
          <p className="h5 fw-bold mt-4">
            12th Mark Percentage:{" "}
            <span className="text-info">{student?.markPercentageOf12}</span>
          </p>
          {student?.nameOf10School !== "" ? (
            <p className="h5 fw-bold mt-4">
              10th School Name :{" "}
              <span className="text-info">{student?.nameOf10School}</span>
            </p>
          ) : null}

          {student?.nameOf12School !== "" ? (
            <p className="h5 fw-bold mt-4">
              12th School Name :{" "}
              <span className="text-info">{student?.nameOf12School}</span>
            </p>
          ) : null}

          <h2 className="text-center">College Details</h2>
          <p className="h5 fw-bold mt-4">
            Year of college Joined :{" "}
            <span className="text-info">{student?.yearOfCollegeJoined}</span>
          </p>
          <p className="h5 fw-bold mt-4">
            Current Studing Year :{" "}
            <span className="text-info">{student?.currentStudingYear}</span>
          </p>
          <p className="h5 fw-bold mt-4">
            Roll Number :{" "}
            <span className="text-info">{student?.rollNumber}</span>
          </p>
          <p className="h5 fw-bold mt-4">
            Exam Number :{" "}
            <span className="text-info">{student?.examNumber}</span>
          </p>
          <p className="h5 fw-bold mt-4">
            Branch : <span className="text-info">{student?.branch}</span>
          </p>
          <p className="h5 fw-bold mt-4">
            Section : <span className="text-info">{student?.section}</span>
          </p>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={5000}
        color="error"
        onClose={closeSnackbar}
        message={errorMessage}
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

export default withRouter(ViewStudent);
