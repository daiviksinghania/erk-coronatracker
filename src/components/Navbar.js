import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">Corona Tracker</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">List View</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cards" className="nav-link">Card View</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0 pull-right">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>
            </nav>
        </div>
    )
}
