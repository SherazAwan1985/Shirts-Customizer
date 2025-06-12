import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.user.role === "admin") {
                navigate("/admin/deshboard");
            } else {
                navigate("/pages/home");
            }
        } catch (err) {
            // Handle error (optional)
            alert("Login failed");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#18181b",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    background: "#27272a",
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.5)",
                    width: "100%",
                    maxWidth: "350px",
                    color: "#f4f4f5"
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Login</h2>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="email" style={{ display: "block", marginBottom: ".5rem" }}>
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: ".75rem",
                            borderRadius: "4px",
                            border: "1px solid #3f3f46",
                            background: "#18181b",
                            color: "#f4f4f5"
                        }}
                    />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                    <label htmlFor="password" style={{ display: "block", marginBottom: ".5rem" }}>
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: ".75rem",
                            borderRadius: "4px",
                            border: "1px solid #3f3f46",
                            background: "#18181b",
                            color: "#f4f4f5"
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: ".75rem",
                        borderRadius: "4px",
                        border: "none",
                        background: "#3b82f6",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;