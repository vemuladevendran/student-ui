import { React, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import Loader from '../loader/loader';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import TokenServe from '../../service/token/token';



function Users() {

    const [errorMessage, setErrorMessage] = useState('');
    const [loader, setLoaderStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState();



    // open snakbar
    const openSnackbar = () => {
        setOpen(true);
    };
    // close snakbar
    const closeSnackbar = () => {
        setOpen(false);
    };


    async function getUserData() {
        try {
            setLoaderStatus(true);
            const data = await axios.get(`http://localhost:3000/api/v1/users`);
            setLoaderStatus(false);
            setUserData(data?.data);
        } catch (error) {
            //  showing error message
            const errorMessage = error?.response.data.message;
            console.error(errorMessage)
            setErrorMessage(errorMessage);
            openSnackbar();
            // finally changing the loader status
            setLoaderStatus(false);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);




    // delete student
    const deleteStudent = async (id) => {
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
                //  getting current userid
                const token = TokenServe.getToken();
                const payload = TokenServe.getTokenPayloadData(token);
                const currentUserId = payload.id;
                //  delete user id
                const userId = id;

                if (currentUserId === userId) {
                    setErrorMessage(`you can't delete your id`);
                    openSnackbar();
                    return;
                }
                const result = await axios.delete(`http://localhost:3000/api/v1/users/${userId}`);
                getUserData();
            } catch (error) {
                console.log(error, 'fail to delete');

            }
        }
    }






    return (
        <div className="container">
            {/* loader */}
            {
                loader === true ? <Loader></Loader> : null
            }
            <div className="row">
                <div className="col-12 table-responsive d-none d-lg-block">
                    {/* desktop view */}
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">FirstName</th>
                                <th scope="col">LastName</th>
                                <th scope="col">email</th>
                                <th scope="col">PhoneNumber</th>
                                <th scope="col">IsAdmin</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                userData?.map((x, i) => {
                                    return (
                                        <tr key={Math.random()}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{x?.firstName}</td>
                                            <td>{x?.lastName}</td>
                                            <td>{x?.email}</td>
                                            <td>{x?.mobileNumber}</td>
                                            <td>{x?.isAdmin}</td>
                                            <td className="text-center">
                                                <button type="button" className="btn btn-danger" onClick={() => { deleteStudent(x.id) }}><i className="bi bi-trash-fill"></i></button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }

                        </tbody>
                    </table>
                </div>

                {/* mobile view */}
                <div className="d-lg-none row justify-content-center">
                    {
                        userData?.map(x => {
                            return (
                                <div className="card text-center py-2" key={Math.random()} style={{ width: '18rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{x?.firstName} <span>{x?.lastName}</span></h5>
                                        <p className="card-text">Email: <span>{x?.email}</span></p>
                                        <p className="card-text">Mobile: <span>{x?.mobileNumber}</span></p>
                                        <p className="card-text">Is Admin: <span>{x?.isAdmin}</span></p>
                                        <div>
                                            <button type="button" className="btn btn-danger" onClick={() => { deleteStudent(x.id) }}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={5000}
                color="error"
                onClose={closeSnackbar}
                message={errorMessage}
                action={
                    <>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </>
                }
            />
        </div>
    );
}

export default Users