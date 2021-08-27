import ss from "./student.module.css";
import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";
import TokenServe from "../../service/token/token";
import departments from "../../service/departement/branches";
import axios from "axios";
import ViewCircularReports from "./view-circular-reports/view-circular-report";
import * as studentServe from "../../service/http/student";
export default function Students() {
  const [branches, setBranches] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [students, setStudents] = useState();
  const [circular, setCirculars] = useState();
  const [reports, setReports] = useState();
  const [filter, setFilter] = useState({
    branch: "",
    currentStudingYear: "",
  });
  const [ViewCircularReport, setViewCircularReport] = useState(false);
  const [dialogData, setDialogData] = useState();

  // getting token data
  const getTokenData = () => {
    const token = TokenServe.getToken();
    const data = TokenServe.getTokenPayloadData(token);
    setIsAdmin(data.isAdmin);
  };

  // get students

  const getStudentsDetails = async () => {
    try {
        
      if (filter.branch === "" && filter.currentStudingYear === "") {
        const students = await studentServe.getStudents();
        setStudents(students.data);
        return;
      }
      const students = await studentServe.getStudents(filter);
      setStudents(students.data);
      console.log(students.data);
    } catch (error) {
      console.error(error);
    }
  };

  // get circulars

  const getCirculars = async () => {
    try {
      const data = await axios.get("http://localhost:5000/api/v1/circular");
      setCirculars(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get reports

  const getReports = async () => {
    try {
      const data = await axios.get("http://localhost:5000/api/v1/report");
      setReports(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // open circular dialog
  const openCircularDialog = (id) => {
    setViewCircularReport(true);
    const data = circular.find((x) => {
      console.log(id);
      if (x.id === id) {
        return x;
      }
    });
    setDialogData(data);
  };

  // open report dialog
  const openReportDialog = (id) => {
    setViewCircularReport(true);
    const data = reports.find((x) => {
      console.log(id);
      if (x.id === id) {
        return x;
      }
    });
    setDialogData(data);
  };

  // close circular dialog
  const closeCircularReportDialog = () => {
    setViewCircularReport(false);
  };

  useEffect(() => {
    getTokenData();
    const branches = departments();
    setBranches(branches);
    getStudentsDetails();
    getCirculars();
    getReports();
  }, []);

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
        await axios.delete(`http://localhost:5000/api/v1/student/${id}`);
        getStudentsDetails();
      } catch (error) {
        console.log(error, "fail to delete");
      }
    }
  };

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
    getStudentsDetails();
  }, [filter]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* student list */}
          <div className="col-12 col-lg-9">
            {/* filters */}
            <div className="row">
              <div className="col-12 col-md-4 col-lg-3 m-2">
                {/* branch filter */}
                <FormControl variant="outlined" className={`${ss.formControl}`}>
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
                    {branches?.map((x) => {
                      return (
                        <MenuItem key={Math.random()} value={x}>
                          {x}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="col-12 col-md-4 col-lg-3 m-2">
                {/* year filter */}
                <FormControl variant="outlined" className={`${ss.formControl}`}>
                  <InputLabel
                    id="demo-simple-select-outlined-label"
                    className="bg-white px-2"
                  >
                    YEAR
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="year"
                    name="currentStudingYear"
                    onChange={onFilterChange}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value="First Year">First Year</MenuItem>
                    <MenuItem value="Second Year">Second Year</MenuItem>
                    <MenuItem value="Third Year">Third Year</MenuItem>
                    <MenuItem value="Fourth Year">Fourth Year</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <hr></hr>
            {/* students cards */}
            <div className="row justify-content-center  justify-content-md-start">
              {students?.map((x, i) => {
                return (
                  <div key={i} className="card m-1" style={{ width: "17rem" }}>
                    <div style={{ maxHeight: "21rem", minHeight: "18.5rem" }}>
                      <img
                        src={x?.photo || "/assets/photo.jpeg"}
                        className="card-img-top mw-100 mh-100"
                        loading="lazy"
                        decoding="async"
                        alt="..."
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{x?.firstName}</h5>
                      <p>({x?.branch})</p>
                      <div className="card-text">
                        <p>
                          Roll No: <span>{x?.rollNumber}</span>
                        </p>
                        <p>
                          Exam No: <span>{x?.examNumber}</span>
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <NavLink
                          to={`students/view-student/${x.id}`}
                          className="btn btn-primary"
                        >
                          View Details
                        </NavLink>
                        <div>
                          <NavLink
                            to={`/students/edit-student/${x.id}`}
                            type="button"
                            className="btn btn-secondary mx-1"
                          >
                            <i className="bi bi-pen-fill"></i>
                          </NavLink>
                          {isAdmin === "true" ? (
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => {
                                deleteStudent(x?.id);
                              }}
                            >
                              <i className="bi bi-trash-fill"></i>
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* graph */}
          <div className="col-12 col-lg-3 d-none d-lg-block vh-100 border-start">
            {/* circular list */}
            <div className="overflow-auto h-50">
              <h4 className="fw-bold">CIRCULARS</h4>
              {circular?.map((x) => {
                return (
                  <div
                    key={Math.random()}
                    className="p-2 shadow-sm rounded m-3"
                    onClick={() => {
                      openCircularDialog(x.id);
                    }}
                  >
                    <h4>{x.circularTitle}</h4>
                    <p className={`${ss.report_content}`}>
                      {x.circularContent.slice(0, 55)}
                    </p>
                  </div>
                );
              })}
            </div>
            <hr></hr>
            {/* roport list */}
            <div className="overflow-auto h-50">
              <h4 className="fw-bold">REPORTS</h4>
              {reports?.map((x) => {
                return (
                  <div
                    key={Math.random()}
                    className="p-2 shadow-sm rounded m-3"
                    onClick={() => {
                      openReportDialog(x.id);
                    }}
                  >
                    <h3>{x.reportTitle}</h3>
                    <p className={`${ss.report_content}`}>
                      {x.reportContent.slice(0, 55)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* view circular report dialog */}
      {dialogData !== (undefined && []) ? (
        <ViewCircularReports
          open={ViewCircularReport}
          closeModal={closeCircularReportDialog}
          data={dialogData}
        ></ViewCircularReports>
      ) : null}
    </>
  );
}
