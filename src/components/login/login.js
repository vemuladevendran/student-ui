import { PureComponent, React } from 'react';
import ss from './login.module.css';
import axios from 'axios';
import TokenServe from '../../service/token'
export default class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            errorDetails: '',
            showLoader: false,
            formValues: {

            }
        };

        this.handleValueChange = this.handleValueChange.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
    }

    async handleValueChange(event) {
        try {
            this.setState({
                errorDetails: '',
                showLoader: false,
                formValues: {
                    ...this.state.formValues,
                    [event.target.name]: event.target.value,
                }
            })
        } catch (error) {
            console.error(error);
        }
    };

    //  handle form submit 
    async handelSubmit(event) {
        try {
            event.preventDefault();

            // //  changing loader state

            this.setState({
                showLoader: true,
            })
            const data = this.state.formValues;
            if (TokenServe.isTokenExist() === true) {
                this.setState({
                    errorDetails: 'Session in Already Exist'
                });
                return;
            }
            const result = await axios.post('http://localhost:3000/api/v1/login', data);
            //  save login token
            const token = result.data.token;
            TokenServe.saveToken(token);

        } catch (error) {
            //  showing error message
            const errorMessage = error?.response?.data?.message;
            this.setState({
                errorDetails: errorMessage,
            });
        } finally {
            // finally changing loader status
            this.setState({
                showLoader: false,
            })
        }
    }

    render() {
        return (
            <div className="container h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-10">
                        {/* loader */}

                        {
                            this.state.showLoader === true ? <div className={`${ss.loader_wrapper}`}>
                                <div className={`${ss.loader} text-white text-center fw-bold h6`}>L</div>
                                <div className={`${ss.loader} text-white text-center fw-bold h6`}>O</div>
                                <div className={`${ss.loader} text-white text-center fw-bold h6`}>A</div>
                                <div className={`${ss.loader} text-white text-center fw-bold h6`}>D</div>
                                <div className={`${ss.loader} text-white text-center fw-bold h6`}>I</div>
                                <div className={`${ss.loader} text-white text-center fw-bold h6`}>N</div>
                                <div className={`${ss.loader} text-white text-center fw-bold h6`}>G</div>
                            </div> : null
                        }


                        <div className="row">
                            <div className="col-6 d-none d-lg-block">
                                <img src="/assets/login-bg-2.jpg" alt="logo" className="w-100 h-100"></img>
                            </div>
                            <div className={`${ss.login_container} col-12 col-lg-6 rounded text-center`}>
                                <h2 className="mt-2 text-white fw-bold">Login</h2>
                                <form className="mt-5" onSubmit={this.handelSubmit}>
                                    {/* form unputs */}
                                    <div className="mt-5">
                                        <span className="input-wrapper bg-white py-3 px-3 rounded">
                                            <span><i className="bi bi-person-bounding-box me-1 text-warning"></i></span>
                                            <input type="text" placeholder="Email" name="email" className={`${ss.login_input} border-0`} onChange={this.handleValueChange}></input>
                                        </span>
                                    </div>
                                    <div className="mt-5">
                                        <span className="input-wrapper bg-white py-3 px-3 rounded">
                                            <span><i className="bi bi-lock-fill me-1 text-warning"></i></span>
                                            <input type="password" placeholder="Password" name="password" className={`${ss.login_input} border-0`} onChange={this.handleValueChange}></input>
                                        </span>
                                    </div>

                                    {/* error details */}

                                    <p className="text-danger mt-3 text-start fw-bold">{this.state.errorDetails}</p>

                                    {/* forget password */}
                                    <div className="mt-4 d-flex justify-content-center">
                                        <div className="d-flex justify-content-between" style={{ width: "280px" }}>
                                            <div className="text-white">
                                                <input type="checkbox" className="me-2" id="remember"></input>
                                                <label htmlFor="remember">Remember me</label>
                                            </div>
                                            <a className="text-white" href="/">Forget Password</a>
                                        </div>
                                    </div>
                                    {/* login button */}
                                    <div className="mt-5">
                                        <button className="px-5 py-2 rounded bg-warning text-white fw-bold border-0">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
