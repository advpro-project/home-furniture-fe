import React from 'react';
import { Link } from 'react-router-dom';
import {isLoggedIn, logout} from "../microservice-1/authUtils";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
    const userLoggedIn = isLoggedIn();
    const user = localStorage.getItem('userData');
    const userRole = user ? JSON.parse(user).role : null;

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
                            <Link className="nav-link" to="/furniture/list">Furniture List</Link>
                        </li>
                        {userRole === "ADMIN" ? (
                            <>
                            <li className="nav-item">
                                <Link className="nav-link" to="...">Manage Furniture</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="...">Manage Promo Code</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="...">Admin Track Delivery</Link>
                            </li>
                            </>
                        ) : (null)}

                        {userRole === "PEMBELI" ? (
                            <>
                            <li className="nav-item">
                                <Link className="nav-link" to="...">Pembeli Track Delivery</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="...">Create Delivery</Link>
                            </li>
                            </>
                        ) : (null)}

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
