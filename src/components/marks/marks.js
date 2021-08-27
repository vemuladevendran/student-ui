import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";

import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Loader from "../loader/loader";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";
import departments from "../../service/departement/branches";
import * as marksServe from "../../service/http/marks";

function Marks() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoaderStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [branches, setBranches] = useState();
  const [marksList, setMarksList] = useState();
  const [filter, setFilter] = useState({
    branch: "",
    currentStudingYear: "",
    section: "",
  });

  // open snakbar
  const openSnackbar = () => {
    setOpen(true);
  };
  // close snakbar
  const closeSnackbar = () => {
    setOpen(false);
  };

  async function getMarksData() {
    try {
      setLoaderStatus(true);
      if (
        filter.branch === "" &&
        filter.currentStudingYear === "" &&
        filter.section === ""
      ) {
        const data = await marksServe.getMarks();
        setLoaderStatus(false);
        setMarksList(data?.data);
        return;
      }
      const data = await marksServe.getMarks(filter);
      setLoaderStatus(false);
      setMarksList(data?.data);
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
    getMarksData();
    const data = departments();
    setBranches(data);
  }, []);

  //   handleing filters
  const onFilterChange = async (event) => {
    try {
      setFilter({
        ...filter,
        [event.target.name]: event.target.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMarksData();
  }, [filter]);

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
        await marksServe.deleteMarks(id);
        getMarksData();
      } catch (error) {}
    }
  };

  return (
    <div className="container-fluid">
      {/* loader */}
      {loader === true ? <Loader></Loader> : null}
      {/* filters */}

      <div className="row">
        <div className="col-12 col-md-3 col-lg-3 my-2">
          {/* branch filter */}
          <FormControl variant="outlined" style={{ width: "100%" }}>
            <InputLabel
              id="demo-simple-select-outlined-label"
              className="bg-white px-2"
            >
              BRANCH
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="BRANCH"
              name="branch"
              onChange={onFilterChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {branches?.map((x, i) => {
                return (
                  <MenuItem key={i} value={x}>
                    {x}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-md-3 col-lg-3 my-2">
          {/* year filter */}
          <FormControl variant="outlined" style={{ width: "100%" }}>
            <InputLabel
              id="demo-simple-select-outlined-label"
              className="bg-white px-2"
            >
              YEAR
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Year"
              name="currentStudingYear"
              onChange={onFilterChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={"First Year"}>First Year</MenuItem>
              <MenuItem value={"Second Year"}>Second Year</MenuItem>
              <MenuItem value={"Third Year"}>Third Year</MenuItem>
              <MenuItem value={"Fourth Year"}>Fourth Year</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="col-12 col-md-3 col-lg-3 my-2">
          {/* year filter */}
          <FormControl variant="outlined" style={{ width: "100%" }}>
            <InputLabel
              id="demo-simple-select-outlined-label"
              className="bg-white px-2"
            >
              Section
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="section"
              name="section"
              onChange={onFilterChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={"a"}>A</MenuItem>
              <MenuItem value={"b"}>B</MenuItem>
              <MenuItem value={"c"}>C</MenuItem>
              <MenuItem value={"d"}>D</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* add marks button */}
        <div className="col-12 col-md-3 col-lg-3 my-2 text-center">
          <NavLink className="btn btn-primary" to="/marks-department-selection">
            Add Marks
          </NavLink>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 row">
          {marksList?.map((x) => {
            return (
              <div
                className="card text-center py-2 col-12 col-sm-6 col-lg-4 col-xl-3"
                key={x._id}
                style={{ minHeight: "20rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    {x.rollNumber} <span>{`(${x.studentName})`}</span>
                  </h5>
                  <span>{x.branch}</span>
                  <p className="card-text">
                    ExamName: <span>{x.examName}</span>
                  </p>
                  <p
                    className="card-text"
                    style={{
                      minHeight: "8rem",
                      maxHeight: "10rem",
                      overflow: "auto",
                    }}
                  >
                    {Object.entries(x.subjectsMarks)?.map((y, i) => {
                      return (
                        <div key={i}>
                          <span>{`${y[0]}  : `}</span>
                          <span className="fw-bold">{y[1]}</span>
                        </div>
                      );
                    })}
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

export default Marks;
