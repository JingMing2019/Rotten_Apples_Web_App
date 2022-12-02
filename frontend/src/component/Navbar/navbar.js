import {Link} from "react-router-dom";


const Navbar = () => {
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link to="/home" className="navbar-brand">Rotten Apples</Link>
                    {/*<p className="navbar-brand">Rotten Apples</p>*/}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarColor01" aria-controls="navbarColor01"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                {/*<a className="nav-link active" href="#">Home*/}
                                {/*    <span className="visually-hidden">(current)</span>*/}
                                {/*</a>*/}
                                <Link className="nav-link" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                {/*<a className="nav-link" href="#">Search</a>*/}
                                <Link className="nav-link" to="/search">Search</Link>
                            </li>
                            <li className="nav-item">
                                {/*<a className="nav-link" href="#">Profile</a>*/}
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <a className="nav-link" href="#">Reviews</a>*/}
                            {/*</li>*/}
                        </ul>

                            {/*<a className="" href="#">Log In</a>*/}
                        {/*<button type="button" className="btn btn-outline-white">Sign up</button>*/}
                        <button type="button" className="btn btn-link-white"><Link className="text-white" to="/login">Log In</Link></button>
                        <button type="button" className="btn btn-outline-white"><Link className="text-white" to="/register">Sign up</Link></button>
                    </div>
                </div>
            </nav>

        </>
    );
}
export default Navbar;