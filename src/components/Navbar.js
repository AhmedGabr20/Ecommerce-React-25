import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function Navbar() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    const handleLogout = async () => {
        await authService.logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <Link className="navbar-brand" to="/">E-Commerce</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">Products</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    {username ? (
                        <>
                            <li className="nav-item">
                                <span className="nav-link">Hello, {username}</span>
                            </li>
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-sm btn-outline-secondary">Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
