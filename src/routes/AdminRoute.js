import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminRoute({ children }) {

    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (token && role !== "ADMIN") {
            toast.error("Access denied: Admins only");
        }
    }, [token, role]);

    if (!token) {
        return <Navigate to="/auth" replace />;
    }

    if (role !== "ADMIN") {
        return <Navigate to="/auth" replace />;
    }

    return children;
}