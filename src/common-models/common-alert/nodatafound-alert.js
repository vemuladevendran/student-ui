import { Dialog } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";

function CommonAlert(props) {
  return (
    <Dialog open={props.open}>
      <div className="container">
        <div className="row p-5">
          <div className="col-12">
            <div className="text-center mb-5">
              <ErrorIcon color="secondary" style={{ fontSize: "5rem" }} />
            </div>
            <p className="fw-bold h4 text-center">{props.errorMessage}</p>
            <div className="text-center mt-5">
              <button
                className="btn btn-primary px-5"
                onClick={props.closeModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default CommonAlert;
