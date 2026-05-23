import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    FaBox,
    FaClipboardList,
    FaChartBar,
    FaSignOutAlt
} from "react-icons/fa";
import {useTranslation} from "react-i18next";

export default function Sidebar() {
    const navigate = useNavigate();

    const { t, i18n } = useTranslation();

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");

        navigate("/auth");
    };

    return (
        <aside
            className="bg-dark text-white p-3"
            style={{
                width: 260,
                minHeight: "100vh"
            }}
        >
            <h4 className="mb-4 fw-bold">
                {t("admin.dashboard")}
            </h4>

            <nav className="d-flex flex-column gap-2">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `btn text-start ${
                            isActive
                                ? "btn-primary"
                                : "btn-outline-light"
                        }`
                    }
                >
                    <FaChartBar className="me-2" />
                    {t("admin.dashboard")}
                </NavLink>

                <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                        `btn text-start ${
                            isActive
                                ? "btn-primary"
                                : "btn-outline-light"
                        }`
                    }
                >
                    <FaClipboardList className="me-2" />
                    {t("admin.orders")}
                </NavLink>

                <NavLink
                    to="/products"
                    className={({ isActive }) =>
                        `btn text-start ${
                            isActive
                                ? "btn-primary"
                                : "btn-outline-light"
                        }`
                    }
                >
                    <FaBox className="me-2" />
                    {t("admin.products")}
                </NavLink>

                <hr />

                <button
                    className="btn btn-danger text-start"
                    onClick={logout}
                >
                    <FaSignOutAlt className="me-2" />
                    {t("nav.logout")}
                </button>
            </nav>
        </aside>
    );
}