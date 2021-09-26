import { withRouter, NavLink } from "react-router-dom";
import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";

import IconButton from "@material-ui/core/IconButton";
import Loader from "../loader/loader";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import CommonAlert from "../../common-models/common-alert/nodatafound-alert";
import * as circularServe from "../../service/http/circular";

function Circular(props) {
  const [ErrorDialog, setErrorDialog] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoaderStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [circularList, setCircularList] = useState();

  // open snakbar
  const openSnackbar = () => {
    setOpen(true);
  };
  // close snakbar
  const closeSnackbar = () => {
    setOpen(false);
  };

  // close error dialog

  const errorDialog = () => {
    props.history.push("students");
    setErrorDialog(false);
  };
  async function getCircularsData() {
    try {
      setLoaderStatus(true);
      const data = await circularServe.getCirculars();
      setLoaderStatus(false);
      setCircularList(data?.data);
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
  }

  useEffect(() => {
    getCircularsData();
  }, []);

  // delete marks
  const deleteMarks = async (id) => {
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
        await circularServe.deleteCircular(id);
        getCircularsData();
      } catch (error) {}
    }
  };

  return (
    <div className="container-fluid">
      {/* loader */}
      {loader === true ? <Loader></Loader> : null}
      {/* filters */}

      {circularList?.length === 0 ? (
        <CommonAlert
          open={ErrorDialog}
          closeModal={errorDialog}
          errorMessage={`No Circulars Found Please Add Circulars`}
        ></CommonAlert>
      ) : null}

      {/* add circular button */}
      <div className="text-md-end pb-3">
        <NavLink className="btn btn-primary" to="/add-circular">
          Add Circulars
        </NavLink>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 row">
          {circularList?.map((x) => {
            return (
              <div
                className="card text-center py-2 col-12 col-sm-6 col-xl-3"
                key={x._id}
                style={{ minHeight: "20rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{x.circularTitle}</h5>
                  <span className="fw-bold text-uppercase fs-6">{`${x.circularFor} Department`}</span>
                  <p
                    className="card-text"
                    style={{
                      minHeight: "8rem",
                      maxHeight: "10rem",
                      overflow: "auto",
                    }}
                  >
                    {x.circularContent}
                  </p>
                  <div>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        deleteMarks(x.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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

export default withRouter(Circular);
