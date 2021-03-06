import { React, useEffect, useState } from "react";
import Swal from "sweetalert2";
import TextField from "@material-ui/core/TextField";
import Loader from "../loader/loader";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withRouter } from "react-router-dom";
import TokenServe from "../../service/token/token";
import * as studentServe from "../../service/http/student";
import * as reportServe from "../../service/http/report";
function CreateReport(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoaderStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    reportTitle: "",
    reportDate: "",
    studentRollNumber: "",
    reportContent: "",
  });

  const getStudentRollNumber = async () => {
    try {
      const studentId = props?.match?.params?.id;
      const student = await studentServe.getStudentById(studentId);
      const rollNumber = student?.data?.rollNumber;
      setFormValues({
        studentRollNumber: rollNumber,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // handle formvalue change

  const handleFormvaluechange = (event) => {
    try {
      setLoaderStatus(false);
      closeSnackbar();
      setFormValues({
        ...formValues,
        [event.target.name]: event.target.value,
      });
    } catch (error) {
      console.error(error);
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

  const goBack = () => {
    props.history.goBack();
  };
  // handle form submit
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // changing loader status
      setLoaderStatus(true);
      //  sending Ajax call

      const data = formValues;
      console.log(data);
      const token = TokenServe.getToken();
      const payload = TokenServe.getTokenPayloadData(token);
      const userId = payload.id;
      const params = {
        id: userId,
      };
      await reportServe.createReports(data, params);
      const result = await Swal.fire("New Report Created");
      setLoaderStatus(false);
      if (result.isConfirmed) {
        props.history.push("/students");
      }
    } catch (error) {
      //  showing error message
      const errorMessage = error?.response.data.message;
      setErrorMessage(errorMessage);
      openSnackbar();
      setLoaderStatus(false);
    }
  };

  useEffect(() => {
    getStudentRollNumber();
  }, []);

  return (
    <div className="container h-100">
      {/* loader */}
      {loader === true ? <Loader></Loader> : null}
      <form
        className="row h-100 justify-content-center align-items-center"
        onSubmit={handleSubmit}
      >
        <section className="col-12 col-md-6 shadow p-4">
          <TextField
            id="outlined-basic"
            label="Report Title"
            onChange={handleFormvaluechange}
            name="reportTitle"
            variant="outlined"
            className="w-100 my-3"
            required
          />
          <TextField
            id="outlined-basic"
            label="Report Date"
            onChange={handleFormvaluechange}
            name="reportDate"
            type="date"
            variant="outlined"
            className="w-100 my-3"
            required
          />
          <TextField
            id="outlined-basic"
            label="Student RollNumber"
            value={formValues?.studentRollNumber}
            onChange={handleFormvaluechange}
            name="studentRollNumber"
            variant="outlined"
            className="w-100 my-3"
            required
          />
          <textarea
            placeholder="Report content"
            onChange={handleFormvaluechange}
            name="reportContent"
            className="w-100 my-3"
            style={{ height: "100px" }}
            required
          />
          {/* button section */}
          <div className="d-md-flex justify-content-center">
            <div className="m-2">
              <button
                type="button"
                className="btn btn-light border border-dark px-5 w-100"
                onClick={goBack}
              >
                Cancel
              </button>
            </div>
            <div className="m-2">
              <button className="btn btn-primary px-5 w-100">Report</button>
            </div>
          </div>
        </section>
        {/* snakbar */}
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
      </form>
    </div>
  );
}

export default withRouter(CreateReport);
