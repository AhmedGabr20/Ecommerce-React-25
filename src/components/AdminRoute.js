import React from "react";
import {Navigate} from "react-router-dom";

export default function AdminRoute({children}){
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!token) return <Navigate to="/login" replace />;
    if (role !== "ADMIN") return <Navigate to="/products" replace />;

    return children ;
}