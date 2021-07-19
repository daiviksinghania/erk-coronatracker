import React from 'react'
import { Link } from 'react-router-dom'
import {
    CARD_VIEW,
    INFINITE_SCROLL_CLASS
} from '../constants/routes';

export const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
                    <Link to="/" className="navbar-brand">Corona Tracker</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active">List View</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={CARD_VIEW} className="nav-link">Card View</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to={CARD_VIEW} className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Infinite Scrolling
                            </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to={INFINITE_SCROLL_CLASS} className="dropdown-item">Using Class Component</Link></li>
                                    <li><Link to="/funccards" className="dropdown-item">Using Functional Component</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
            </nav>
        </div>
    )
}
