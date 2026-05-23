import React, {useEffect} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";

import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminOrdersPage from "./pages/order/AdminOrdersPage";
import AdminProductsPage from "./pages/product/AdminProductsPage";
import { useTranslation } from "react-i18next";
import AdminRoute from "./routes/AdminRoute";
import AuthPage from "./pages/Auth/AuthPage";
import {ToastContainer} from "react-toastify";


function App() {

    const { i18n } = useTranslation();

    useEffect(() => {
        document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    }, [i18n.language]);
    return (
        <BrowserRouter>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
            />
            <Routes>
                <Route path="/auth" element={<AuthPage />} />

                <Route
                    path="/"
                    element={<Navigate to="/dashboard" />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <AdminRoute>
                            <AdminLayout>
                                <AdminDashboard />
                            </AdminLayout>
                        </AdminRoute>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <AdminRoute>
                            <AdminLayout>
                                <AdminOrdersPage />
                            </AdminLayout>
                        </AdminRoute>
                    }
                />

                <Route
                    path="/products"
                    element={
                        <AdminRoute>
                            <AdminLayout>
                                <AdminProductsPage />
                            </AdminLayout>
                        </AdminRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;