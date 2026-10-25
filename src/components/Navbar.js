import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { FaMoon, FaSun, FaShoppingCart } from "react-icons/fa";
import LanguageSwitcher from "../utils/LanguageSwitcher";
import { useTranslation } from "react-i18next";


export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useCart();
    const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
    const { t, i18n } = useTranslation();

    const toggleTheme = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.dataset.theme = next ? "dark" : "light";
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    const cartCount = cart?.items ? cart.items.reduce((s, i) => s + i.quantity, 0) : 0;
    const role = localStorage.getItem("role");

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">

            <Link className="navbar-brand fw-bold" to="/products">
                {t("nav.brand")}
            </Link>

            <div className="navbar-collapse">

                <ul className="navbar-nav me-auto">

                    <li className="nav-item">
                        <Link className="nav-link" to="/products">
                            {t("nav.products")}
                        </Link>
                    </li>


                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <FaShoppingCart />
                                <span className="badge bg-danger ms-2">
                            {cartCount}
                        </span>
                            </Link>
                        </li>
                   

                </ul>


                {/* RIGHT SIDE */}

                <div className="d-flex align-items-center gap-2">

                    <button className="btn btn-sm btn-outline-secondary" onClick={toggleTheme}>
                        {dark ? <FaSun /> : <FaMoon />}
                    </button>

                    <LanguageSwitcher />

                    {user ? (

                        <div className="dropdown">

                            <button
                                className="btn btn-sm btn-outline-dark dropdown-toggle"
                                data-bs-toggle="dropdown"
                            >
                                {user.username}
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">

                                <li>
                                    <Link className="dropdown-item" to="/orders">
                                        {t("nav.myOrders")}
                                    </Link>
                                </li>

                                {role === "ADMIN" && (
                                    <li>
                                        <Link className="dropdown-item" to="/admin/dashboard">
                                            Admin
                                        </Link>
                                    </li>
                                )}

                                <li>
                                    <button className="dropdown-item text-danger" onClick={logout}>
                                        {t("nav.logout")}
                                    </button>
                                </li>

                            </ul>

                        </div>

                    ) : (

                        <Link className="btn btn-sm btn-primary" to="/login">
                            {t("nav.login")}
                        </Link>

                    )}

                </div>

            </div>

        </nav>
    );
}
