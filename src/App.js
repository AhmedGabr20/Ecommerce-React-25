import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProductList from "./pages/Products/ProductList";
import ProtectedRoute from "./components/ProtectedRoute";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import PaymentPage from "./pages/Payment/PaymentPage";
import OrderPage from "./pages/Orders/OrdersPage";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
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
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/products" element={<ProductList />} />
                {/*<Route path="/products" element={*/}
                {/*    <ProtectedRoute>*/}
                {/*        <ProductList />*/}
                {/*    </ProtectedRoute>*/}
                {/*} />*/}
                <Route path="/cart" element={
                        <ProtectedRoute>
                            <CartPage />
                        </ProtectedRoute>
                }/>
                <Route path="/checkout" element={
                    <ProtectedRoute>
                        <CheckoutPage />
                    </ProtectedRoute>
                }/>
                <Route path="/payment/:orderId" element={
                    <ProtectedRoute>
                        <PaymentPage />
                    </ProtectedRoute>
                }/>
                <Route path="/orders" element={
                    <ProtectedRoute>
                        <OrderPage />
                    </ProtectedRoute>
                }/>

                <Route path="*" element={<ProductList/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
