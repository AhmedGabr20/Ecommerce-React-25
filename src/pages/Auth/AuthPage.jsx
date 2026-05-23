import React, { useState } from "react";
import "./Auth.css";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage() {

    const [mode, setMode] = useState("login");

    return (
        <div className="auth-page">

            <div className="auth-card">

                {/* Tabs */}
                <div className="d-flex mb-4 border-bottom">

                    <button
                        className={`tab-btn ${mode === "login" ? "active" : ""}`}
                        onClick={() => setMode("login")}
                    >
                        Login
                    </button>

                    <button
                        className={`tab-btn ${mode === "register" ? "active" : ""}`}
                        onClick={() => setMode("register")}
                    >
                        Register
                    </button>

                </div>

                {/* Content */}
                {mode === "login" ? <Login /> : <Register onSuccess={() => setMode("login")}/>}

            </div>

        </div>
    );
}