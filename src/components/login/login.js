import { PureComponent } from 'react';
import ss from './login.module.css'
class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className="container h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-10">
                        <div className="row">
                            <div className="col-6 d-none d-lg-block">
                                <img src="/assets/login-page-img.webp" alt="logo" className="w-100"></img>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className={`${ss.login_container} text-center rounded`}>
                                    <h2 className="mt-2 text-white fw-bold">Login</h2>
                                    <div className="mt-5">
                                        <div className="mt-5">
                                            <span className="input-wrapper bg-white py-3 px-3 rounded">
                                                <span><i className="bi bi-person-bounding-box me-1 text-warning"></i></span>
                                                <input type="text" placeholder="Email" className={`${ss.login_input} border-0`}></input>
                                            </span>
                                        </div>
                                        <div className="mt-5">
                                            <span className="input-wrapper bg-white py-3 px-3 rounded">
                                                <span><i className="bi bi-lock-fill me-1 text-warning"></i></span>
                                                <input type="password" placeholder="Password" className={`${ss.login_input} border-0`}></input>
                                            </span>
                                        </div>
                                        <div className="mt-5 d-flex justify-content-center">
                                            <div className="d-flex justify-content-between" style={{ width: "280px" }}>
                                                <div className="text-white">
                                                    <input type="checkbox" className="me-2" id="remember"></input>
                                                    <label htmlFor="remember">Remember me</label>
                                                </div>
                                                <a className="text-white" href="/">Forget Password</a>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <button className="px-5 py-2 rounded bg-warning text-white fw-bold border-0">Login</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Login;