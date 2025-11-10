import React, { useState } from "react";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await authService.login(form);
            if (res && res.data && res.data.accessToken) {
                // login() stored token already
                // if backend returns user id, store it:
                if (res.data.id) localStorage.setItem("userId", res.data.id);
                navigate("/products");
            } else {
                setErr(res.data?.message || "Login failed");
            }
        } catch (error) {
            setErr(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="container mt-5" style={{maxWidth: 420}}>
            <h3>Login</h3>
            {err && <div className="alert alert-danger">{err}</div>}
            <form onSubmit={submit}>
                <input className="form-control mb-2" placeholder="Username" value={form.username}
                       onChange={(e)=>setForm({...form, username: e.target.value})} />
                <input className="form-control mb-2" placeholder="Password" type="password" value={form.password}
                       onChange={(e)=>setForm({...form, password: e.target.value})} />
                <button className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}
