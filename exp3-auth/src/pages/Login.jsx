import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }

    setError("");

    // Demo JWT payload
    const payload = {
      userId: Date.now(),
      username: username.trim(),
      role: role,
      exp: Math.floor(Date.now() / 1000) + 3600,
    };

    // Demo JWT token
    const base64Payload = btoa(JSON.stringify(payload));

    const token = `demo-header.${base64Payload}.demo-signature`;

    // Store authentication information
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username.trim());

    // Decode token to verify JWT data
    try {
      const decoded = jwtDecode(token);

      console.log("JWT decoded successfully:", decoded);
    } catch (error) {
      console.log("JWT decode failed:", error);
    }

    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#ffffff",
          padding: "35px",
          borderRadius: "18px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "42px", marginBottom: "10px" }}>
            🔐
          </div>

          <h1
            style={{
              margin: "0",
              fontSize: "28px",
              color: "#111827",
            }}
          >
            SecureCMS
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginTop: "8px",
            }}
          >
            Role-Based Authentication
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #d1d5db",
                borderRadius: "9px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Select Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #d1d5db",
                borderRadius: "9px",
                fontSize: "14px",
                background: "#ffffff",
                boxSizing: "border-box",
              }}
            >
              <option value="admin">
                🛡️ Admin
              </option>

              <option value="editor">
                ✏️ Editor
              </option>

              <option value="viewer">
                👁️ Viewer
              </option>
            </select>
          </div>

          {error && (
            <div
              style={{
                background: "#fee2e2",
                color: "#b91c1c",
                padding: "11px",
                borderRadius: "8px",
                marginBottom: "18px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px",
              border: "none",
              borderRadius: "9px",
              background: "#2563eb",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login Securely →
          </button>

        </form>

        <div
          style={{
            marginTop: "25px",
            padding: "14px",
            background: "#f8fafc",
            borderRadius: "9px",
            fontSize: "12px",
            color: "#64748b",
            textAlign: "center",
          }}
        >
          JWT Authentication • RBAC • Protected Routes
        </div>
      </div>
    </div>
  );
}

export default Login;