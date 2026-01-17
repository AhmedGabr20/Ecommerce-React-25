import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const schema = yup.object().shape({
    username: yup.string().email("Invalid email").required(),
    password: yup.string().min(3).required(),
});

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const res = await authService.login(data);
            login(res);
            toast.success("Welcome!");
            navigate("/products");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="container mt-5" style={{maxWidth:420}}>
            <h3>Login</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="form-control mb-2" placeholder="Email" {...register("username")} />
                {errors.username && <div className="text-danger small">{errors.username.message}</div>}
                <input className="form-control mb-2" placeholder="Password" type="password" {...register("password")} />
                {errors.password && <div className="text-danger small">{errors.password.message}</div>}
                <button className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Logging..." : "Login"}</button>
            </form>
        </div>
    );
}
