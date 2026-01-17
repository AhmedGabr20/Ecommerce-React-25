import React from "react";

export default function Spinner({ size = 40 }) {
    return (
        <div style={{ width: size, height: size }} className="d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status" aria-hidden="true"></div>
        </div>
    );
}
