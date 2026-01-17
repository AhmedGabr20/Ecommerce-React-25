import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { FaMoon, FaSun, FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useCart();
    const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

    const toggleTheme = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.dataset.theme = next ? "dark" : "light";
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    const cartCount = cart?.items ? cart.items.reduce((s, i) => s + i.quantity, 0) : 0;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <Link className="navbar-brand" to="/products">E-Commerce</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
                    {user && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    <FaShoppingCart /> Cart
                                    {cartCount > 0 && <span className="badge bg-danger ms-2">{cartCount}</span>}
                                </Link>
                            </li>
                            <li className="nav-item"><Link className="nav-link" to="/orders">My Orders</Link></li>
                        </>
                    )}
                </ul>

                <ul className="navbar-nav ms-auto">
                    <li className="nav-item me-2">
                        <button className="btn btn-sm btn-outline-secondary" onClick={toggleTheme}>
                            {dark ? <FaSun/> : <FaMoon/>}
                        </button>
                    </li>

                    {user ? (
                        <>
                            <li className="nav-item"><span className="nav-link">Hi, {user.username}</span></li>
                            <li className="nav-item">
                                <button className="btn btn-sm btn-outline-danger" onClick={logout}>Logout</button>
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
