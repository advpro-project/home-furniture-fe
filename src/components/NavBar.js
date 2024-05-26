import React from 'react';
import { Link } from 'react-router-dom';
import {isLoggedIn, logout} from "../microservice-1/authUtils";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
    const userLoggedIn = isLoggedIn();
    const userRole = localStorage.getItem('userData');

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">HoomGroom</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/furniture/list">Furniture</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {!userLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth/register">Register</Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
