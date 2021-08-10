import ss from './view-student.module.css'
import Swal from 'sweetalert2';


function ViewStudent() {


    // delete student
    const deleteStudent = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {


            } catch (error) {
                console.log(error, 'fail to delete');

            }
        }
    }


    return (
        <div className="container-fluid">
            <div className="row">
                {/* personal details */}
                <div className="col-12 col-lg-6">
                    {/* profile image */}
                    <div className="row shadow-lg p-3 w-100 m-0">
                        <h2 className="text-center">Personal Details</h2>
                        <div className="col-12 col-md-6 col-lg-8 d-flex flex-column justify-content-center align-items-center">
                            <p className="fw-bold h5">DEVENDRAN V</p>
                            <p>2019PECIT248</p>
                            <p>INFORMATION TECHNOLOGY</p>
                            <p className="fw-bold">ADDRESS</p>
                            <p>
                                Sri Rama Kuppam(village),
                                seethanjeri(post),
                                chennai 602026.
                            </p>
                            {/* button section */}
                            <div className="btn-group my-1" role="group" aria-label="Basic mixed styles example">
                                <button type="button" className="btn btn-success">Share</button>
                                <button type="button" className="btn btn-warning">Report</button>
                                <button type="button" className="btn btn-danger" onClick={deleteStudent}>Delete</button>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            {/* <img src="/assets/default-profile.png" alt="profile" className={`${ss.profile_image}`} /> */}
                            <img src="/assets/photo.jpeg" alt="profile" className="w-100" />
                        </div>
                        {/* lastupdate details */}
                        <div className="d-md-flex justify-content-between mt-3">
                            <p>Created By : <span>ADMIN</span></p>
                            <p>LastUpdate : <span>23/08/2021</span></p>
                        </div>
                    </div>
                    {/* contact details */}
                    <div className="shadow-lg p-4 bg-white mt-4">
                        <p className="h5 fw-bold mt-4">
                            Email : <span className="text-info">devendran@gmail.com</span>
                        </p>
                        <p className="h5 fw-bold mt-4">
                            Gender : <span className="text-info">Male</span>
                        </p>
                        <p className="h5 fw-bold mt-4">
                            Mobile : <span className="text-info">9445296380</span>
                        </p>
                        <p className="h5 fw-bold mt-4">
                            DOB : <span className="text-info">27/08/2002</span>
                        </p>
                        <p className="h5 fw-bold mt-4">
                            Father's Name : <span className="text-info">Janaradhanan</span>
                        </p>
                        <p className="h5 fw-bold mt-4">
                            Mother's Name : <span className="text-info">Dhanalakshmi</span>
                        </p>
                    </div>
                </div>
                {/* education details */}
                <div className="col-12 col-lg-6 shadow-lg p-3 bg-white mt-3 m-lg-0">
                    <h2 className="text-center">Education Details</h2>
                    <p className="h5 fw-bold mt-4">
                        Year of 10th Passout : <span className="text-info">2017</span>
                    </p>
                    <p className="h5 fw-bold mt-4">
                        Year of 12th Passout : <span className="text-info">2017</span>
                    </p>
                    <p className="h5 fw-bold mt-4">
                        10th Mark Percentage: <span className="text-info">22</span>
                    </p>
                    <p className="h5 fw-bold mt-4">
                        12th Mark Percentage: <span className="text-info">22</span>
                    </p>
                    <p className="h5 fw-bold mt-4">
                        10th School Name : <span className="text-info">Vivekananda</span>
                    </p>
                    <p className="h5 fw-bold mt-4">
                        12th School Name : <span className="text-info">Vivekananda</span>
                    </p>
                    <h2 className="text-center">College Details</h2>
                    <p className="h5 fw-bold mt-4">
                        Year of college Joined : <span className="text-info">2019</span>
                    </p>
                    <p className="h5 fw-bold mt-4">
                        Current Studing Year : <span className="text-info">Second Year</span>
                    </p>
                    <p className="h5 fw-bold mt-4">
                        Roll Number : <span className="text-info">2019PECIT248</span>
                    </p>
                    <p className="h5 fw-bold mt-4">
                        Exam Number : <span className="text-info">211419205038</span>
                    </p>
                    <p className="h5 fw-bold mt-4">
                        Branch : <span className="text-info">Information Technology</span>
                    </p>
                    <p className="h5 fw-bold mt-4">
                        Section : <span className="text-info">C</span>
                    </p>
                </div>
            </div>
        </div>
    );
}


export default ViewStudent;