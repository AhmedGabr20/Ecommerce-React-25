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
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <Link className="navbar-brand" to="/products">
                {t("nav.brand")}
            </Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">
                            {t("nav.products")}
                        </Link>
                    </li>
                    {user && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    <FaShoppingCart /> {t("nav.cart")}
                                    {cartCount > 0 && <span className="badge bg-danger ms-2">{cartCount}</span>}
                                </Link>
                            </li>
                            <li className="nav-item"><Link className="nav-link" to="/orders">{t("nav.myOrders")}</Link></li>
                        </>
                    )}
                </ul>

                <ul className="navbar-nav ms-auto">
                    <li className="nav-item me-2">
                        <button className="btn btn-sm btn-outline-secondary" onClick={toggleTheme}>
                            {dark ? <FaSun/> : <FaMoon/>}
                        </button>
                    </li>
                    <li className="nav-item me-2">
                        <LanguageSwitcher />
                    </li>

                    {user ? (
                        <>
                            <li className="nav-item"><span className="nav-link">{t("nav.hi")}, {user.username}</span></li>

                            {role === "ADMIN" && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/dashboard">
                                            {t("nav.admin")}
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/orders">
                                            {t("orders.title")}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/products">
                                            Admin Products
                                        </Link>
                                    </li>
                                </>
                            )}

                            <li className="nav-item">
                                <button className="btn btn-sm btn-outline-danger" onClick={logout}>{t("nav.logout")}</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/login">{t("nav.login")}</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/register">{t("nav.register")}</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
