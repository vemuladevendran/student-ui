import ss from './student.module.css';
import { React, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';
import TokenServe from '../../service/token';
import departments from '../../service/departement/branches';

export default function Students() {
    const [branches, setBranches] = useState();
    const [isAdmin, setIsAdmin] = useState();

    // getting token data
    const getTokenData = () => {
        const token = TokenServe.getToken();
        return (TokenServe.getTokenPayloadData(token));
    }

    useEffect(() => {
        const data = getTokenData();
        setIsAdmin(data.isAdmin);

    }, []);

    const students = Array(5).fill('');

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


    useEffect(() => {
        const data = departments();
        setBranches(data);
    }, [])



    return (
        <div className="container-fluid">

            <div className="row">
                {/* student list */}
                <div className="col-12 col-lg-9">
                    {/* filters */}
                    <div className="row">
                        <div className="col-12 col-md-4 col-lg-3 m-2">
                            {/* branch filter */}
                            <FormControl variant="outlined" className={`${ss.formControl}`}>
                                <InputLabel id="demo-simple-select-outlined-label" className="bg-white px-2">BRANCH</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    label="BRANCH"
                                >
                                    <MenuItem value="">
                                        <em>All</em>
                                    </MenuItem>
                                    {
                                        branches?.map(x => {
                                            return (
                                                <MenuItem key={Math.random()} value={x}>{x}</MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 m-2">
                            {/* year filter */}
                            <FormControl variant="outlined" className={`${ss.formControl}`}>
                                <InputLabel id="demo-simple-select-outlined-label" className="bg-white px-2">YEAR</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    label="BRANCH"
                                >
                                    <MenuItem value="">
                                        <em>All</em>
                                    </MenuItem>
                                    <MenuItem value={'First Year'}>First Year</MenuItem>
                                    <MenuItem value={'Second Year'}>Second Year</MenuItem>
                                    <MenuItem value={'Third Year'}>Third Year</MenuItem>
                                    <MenuItem value={'Fourth Year'}>Fourth Year</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <hr></hr>
                    {/* students cards */}
                    <div className="row justify-content-center  justify-content-md-start">
                        {
                            students.map((x, i) => {
                                return (
                                    <div key={i} className="card m-1" style={{ width: '17rem' }}>
                                        <div style={{ maxHeight: '21rem' }}>
                                            <img src="/assets/photo.jpeg" className="card-img-top mw-100 mh-100" loading="lazy" decoding="async" alt="..." />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Devendran</h5>
                                            <p>(INFORMATION TECHNOLOGY)</p>
                                            <div className="card-text">
                                                <p>Roll No: <span>2019PECIT248</span></p>
                                                <p>Exam No: <span>211419205038</span></p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <NavLink to="students/view-student" className="btn btn-primary">View Details</NavLink>
                                                <div>
                                                    <button type="button" className="btn btn-secondary mx-1"><i className="bi bi-pen-fill"></i></button>
                                                    {
                                                        isAdmin === 'true' ? (
                                                            <button type="button" className="btn btn-danger" onClick={deleteStudent}><i className="bi bi-trash-fill"></i></button>
                                                        ) : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                {/* graph */}
                <div className="col-12 col-lg-3 d-none d-lg-block">
                    <img src="/assets/graph-1.webp" className="card-img-top w-100" alt="..." />
                    <img src="/assets/graph-2.png" className="card-img-top w-100" alt="..." />
                </div>
            </div>

        </div>
    );
}