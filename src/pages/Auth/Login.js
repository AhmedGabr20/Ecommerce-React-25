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

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const res = await authService.login(data);
            login(res);
         //   toast.success("Welcome Admin 🚀");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <h2 className="mb-1">Admin Panel</h2>
                <p className="text-muted mb-4">Sign in to continue</p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-3">
                        <input
                            className="form-control form-control-lg"
                            placeholder="Email"
                            {...register("username")}
                        />
                        {errors.username && (
                            <div className="text-danger small mt-1">
                                {errors.username.message}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <input
                            className="form-control form-control-lg"
                            type="password"
                            placeholder="Password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <div className="text-danger small mt-1">
                                {errors.password.message}
                            </div>
                        )}
                    </div>

                    <button
                        className="btn btn-primary w-100 btn-lg"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing in..." : "Login"}
                    </button>

                </form>
            </div>

        </div>
    );
}