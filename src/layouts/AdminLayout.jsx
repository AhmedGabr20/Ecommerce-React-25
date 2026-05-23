import React from "react";
import Sidebar from "../components/toolBar/Sidebar";
import Topbar from "../components/toolBar/Topbar";

export default function AdminLayout({ children }) {
    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Sidebar />

            <div className="flex-grow-1 bg-light">
                <Topbar />

                <main className="p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}