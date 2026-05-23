import React from "react";
import LanguageSwitcher from "../../utils/LanguageSwitcher";

export default function Topbar() {
    return (
        <div
            className="bg-white border-bottom px-4 d-flex align-items-center justify-content-between"
            style={{ height: 70 }}
        >
            <LanguageSwitcher />
            <h5 className="mb-0">
                Admin Dashboard
            </h5>

            <div className="fw-semibold">
                Welcome Admin
            </div>

        </div>
    );
}