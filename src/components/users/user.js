import { React, useState } from 'react';
import Swal from 'sweetalert2';

const tableData = Array(10).fill('');



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


function Users() {
    return (
        <div className="container">
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
                                tableData.map((x, i) => {
                                    return (
                                        <tr key={Math.random()}>
                                            <th scope="row">{i + 1}</th>
                                            <td>Deva</td>
                                            <td>v</td>
                                            <td>devendranvemula@gmail.com</td>
                                            <td>9445094333</td>
                                            <td>true</td>
                                            <td className="text-center">
                                                <button type="button" className="btn btn-danger" onClick={deleteStudent}><i className="bi bi-trash-fill"></i></button>
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
                        tableData.map(x => {
                            return (
                                <div className="card text-center py-2" key={Math.random()} style={{ width: '18rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Devendran <span>Vemula</span></h5>
                                        <p className="card-text">Email: <span>devendranvemula@gmail.com</span></p>
                                        <p className="card-text">Mobile: <span>9445296380</span></p>
                                        <p className="card-text">Is Admin: <span>True</span></p>
                                        <div>
                                            <button type="button" className="btn btn-danger" onClick={deleteStudent}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Users