import React, { useState } from "react";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await authService.register(form);
            if (res && res.status === "SUCCESS") {
                navigate("/login");
            } else {
                setErr(res.message || "Registration failed");
            }
        } catch (error) {
            setErr(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="container mt-5" style={{maxWidth: 420}}>
            <h3>Register</h3>
            {err && <div className="alert alert-danger">{err}</div>}
            <form onSubmit={submit}>
                <input className="form-control mb-2" placeholder="Username" value={form.username}
                       onChange={(e)=>setForm({...form, username: e.target.value})} />
                <input className="form-control mb-2" placeholder="Password" type="password" value={form.password}
                       onChange={(e)=>setForm({...form, password: e.target.value})} />
                <button className="btn btn-success">Register</button>
            </form>
        </div>
    );
}
