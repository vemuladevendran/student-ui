// import ss from './app-shell-module.css'
export default function AppShell() {

    return (
        <div className={`container-fluid`}>
            <div className={`row`}>
                <div className={`col-12`}>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#70b0ed'}}>
                            <div className="container-fluid">
                                <a className="navbar-brand" href="/">Navbar</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/">Features</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/">Pricing</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}