import { Dialog } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import TokenServe from "../../../service/token/token"
import * as marksServe from "../../../service/http/marks";
function AddMarks(props) {

  const [filterdetails, setFilterDetails] = useState();
  const [selectedStudent, setSelectedStudent] = useState();
  const [subjects, setSubjects] = useState();
  const [formValues, setFormValues] = useState({});
  const [marks, setMarks] = useState({});

  const handleMarkschange = (event) => {
    setMarks({
      ...marks,
      [event.target.name]: event.target.value,
    });
  };

  //   pushing marks to formvalues
  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const token = TokenServe.getToken();
      const payload = TokenServe.getTokenPayloadData(token);
      const userId = payload.id;
      const params = {
        id: userId,
      };
      await marksServe.createMarks(formValues, params);
      props.closeModal();
      props.successMessage();
    } catch (error) {
      console.error(error);
    }
  };

  //   getting selected student details
  useEffect(() => {
    setFilterDetails(props?.filterdetails);
    setSelectedStudent(props?.student);
    setSubjects(props?.subjects);
  });

  useEffect(() => {
    setFormValues({
      ...formValues,
      subjectsMarks: marks,
    });
  }, [marks]);

  //   applying selected student values to formvalues
  useEffect(() => {
    setFormValues({
      studentId: selectedStudent?.id,
      rollNumber: selectedStudent?.rollNumber,
      studentName: selectedStudent?.firstName,
      examNumber: selectedStudent?.examNumber,
      section: selectedStudent?.section,
      branch: selectedStudent?.branch,
      currentStudingYear: selectedStudent?.currentStudingYear,
      examName: filterdetails?.examName,
    });
  }, [selectedStudent]);

  return (
    <Dialog open={props.open}>
      <div className="container p-5">
        <form className="row" onSubmit={handleFormSubmit}>
          <div className="col-12">
            <h4 className="fw-bold text-center">Enter Marks</h4>
            <div className="d-flex justify-content-between">
              <p className="fw-bold text-primary">
                {selectedStudent?.firstName}
              </p>
              <p className="fw-bold text-primary">
                {selectedStudent?.rollNumber}
              </p>
            </div>
            <hr />
            {subjects?.map((x, i) => {
              return (
                <div key={i} className="row align-items-center">
                  <span className="fw-bold me-2">{x}</span>
                  <TextField
                    id="outlined-basic"
                    name={x}
                    type="number"
                    onChange={handleMarkschange}
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    label="Enter marks"
                    variant="outlined"
                    className="w-100 my-3"
                  />
                </div>
              );
            })}

            {/* button section */}
            <div>
              <div className="m-2">
                <button
                  className="btn btn-secondary w-100"
                  type="button"
                  onClick={props.closeModal}
                >
                  Close
                </button>
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
