import { React, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import departments from '../../../service/departement/branches';


function DepartmentSelectionForm(props) {
    const [branches, setBranches] = useState();
    const [formValues, setFormValues] = useState({
        branch: '',
        currentStudingYear: '',
        semester: '',
        examName: '',
    });

    // handle formvalue change

    const handleFormvaluechange = (event) => {

        try {
            setFormValues({
                ...formValues,
                [event.target.name]: event.target.value,
            });
        } catch (error) {
            console.error(error);
        }
    }


    const goBack = () => {
        props.history.goBack();
    }
    // handle form submit
    const handleSubmit = async (event) => {
        try {
            props.history.push(`/studentlist-marks/${formValues.branch}/${formValues.currentStudingYear}/${formValues.semester}/${formValues.examName}`)
        } catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        const data = departments();
        setBranches(data);
    }, [])

    return (
        <div className="container h-100">
            <form className="row h-100 justify-content-center align-items-center" onSubmit={handleSubmit}>
                <section className="col-12 col-md-6 shadow p-4">
                    <FormControl variant="outlined" className="w-100 my-3" required>
                        <InputLabel id="demo-simple-select-outlined-label" className="bg-white">Select Department</InputLabel>
                        <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" onChange={handleFormvaluechange} name="branch" label="Select Department" >
                            {
                                branches?.map(x => {
                                    return (
                                        <MenuItem key={Math.random()} value={x}>{x}</MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className="w-100 my-3" required>
                        <InputLabel id="demo-simple-select-outlined-label" className="bg-white px-2">Select YEAR</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="select year"
                            name="currentStudingYear"
                            onChange={handleFormvaluechange}
                        >
                            <MenuItem value={'First Year'}>First Year</MenuItem>
                            <MenuItem value={'Second Year'}>Second Year</MenuItem>
                            <MenuItem value={'Third Year'}>Third Year</MenuItem>
                            <MenuItem value={'Fourth Year'}>Fourth Year</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className="w-100 my-3" required>
                        <InputLabel id="demo-simple-select-outlined-label" className="bg-white px-2">select Semester</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="select year"
                            name="semester"
                            onChange={handleFormvaluechange}
                        >
                            <MenuItem value='FirstSemester'>1</MenuItem>
                            <MenuItem value='SecondSemester'>2</MenuItem>
                            <MenuItem value='ThirdSemester'>3</MenuItem>
                            <MenuItem value='FourthSemester'>4</MenuItem>
                            <MenuItem value='FifthSemester'>5</MenuItem>
                            <MenuItem value='SixthSemester'>6</MenuItem>
                            <MenuItem value='SeventhSemester'>7</MenuItem>
                            <MenuItem value='EightSemester'>8</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="outlined-basic" label="Exam Name" onChange={handleFormvaluechange} name="examName" variant="outlined" className="w-100 my-3" required />
                    {/* button section */}
                    <div className="d-md-flex justify-content-center">
                        <div className="m-2">
                            <button type="button" className="btn btn-light border border-dark px-5 w-100" onClick={goBack}>Cancel</button>
                        </div>
                        <div className="m-2">
                            <button className="btn btn-primary px-5 w-100">Search</button>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    );

}




export default withRouter(DepartmentSelectionForm);