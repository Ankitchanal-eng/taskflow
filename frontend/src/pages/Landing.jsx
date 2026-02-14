import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasToken = !!localStorage.getItem("token");
    if (hasToken) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "10px", color: "#333", fontSize: "2.5rem" }}>
          Welcome to TaskFlow
        </h1>

        <p
          style={{
            marginBottom: "40px",
            color: "#666",
            fontSize: "1.1rem",
          }}
        >
          Manage your tasks securely. Please register or log in to continue.
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "12px 32px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              transition: "0.3s",
              minWidth: "150px",
            }}
          >
            Register
          </button>

          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "12px 32px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              transition: "0.3s",
              minWidth: "150px",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
