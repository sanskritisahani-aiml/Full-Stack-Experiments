import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserFromToken, logout } from "../utils/auth";
import PostManager from "../components/PostManager";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const user = getUserFromToken();

  const [message, setMessage] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const testApi = async () => {
    try {
      setMessage("Testing secure API...");

      const response = await api.get("/posts/1");

      setMessage(
        `API Request Successful! Post ID: ${response.data.id}`
      );
    } catch (error) {
      setMessage("API request failed.");
    }
  };

  const role = user?.role?.toLowerCase();

  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-logo">
          <span className="logo-icon">🔐</span>
          <span>SecureCMS</span>
        </div>

        <nav className="sidebar-nav">

          <div className="nav-item active">
            <span>📊</span>
            Dashboard
          </div>

          {role === "admin" && (
            <div
              className="nav-item"
              onClick={() => navigate("/admin")}
            >
              <span>🛡️</span>
              Admin Panel
            </div>
          )}

          <div className="nav-item">
            <span>📝</span>
            Content
          </div>

        </nav>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <span>🚪</span>
          Logout
        </button>

      </aside>

      {/* MAIN */}
      <main className="dashboard-main">

        {/* HEADER */}
        <header className="dashboard-header">

          <div>
            <h1>Dashboard</h1>
            <p>Manage your content securely.</p>
          </div>

          <div className="user-badge">

            <div className="user-avatar">
              {user?.username
                ? user.username.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div className="user-info">
              <strong>{user?.username || "User"}</strong>
              <span>{role || "user"}</span>
            </div>

          </div>

        </header>

        {/* WELCOME */}
        <section className="welcome-card">

          <div>
            <p className="welcome-label">
              WELCOME BACK
            </p>

            <h2>
              Hello, {user?.username || "User"}! 👋
            </h2>

            <p>
              Here's what's happening with your content today.
            </p>
          </div>

          <div className="security-status">
            <span className="status-dot"></span>
            Authenticated
          </div>

        </section>

        {/* STATS */}
        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon blue">
              🔐
            </div>

            <div>
              <span>Authentication</span>
              <strong>Secure</strong>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon green">
              👤
            </div>

            <div>
              <span>Your Role</span>
              <strong>
                {role || "User"}
              </strong>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon purple">
              🎟️
            </div>

            <div>
              <span>Token</span>
              <strong>Active</strong>
            </div>

          </div>

        </section>

        {/* ROLE ACCESS */}
        <section className="section-card">

          <div className="section-title">

            <div>
              <h2>Role-Based Access</h2>
              <p>
                Your permissions are determined by your role.
              </p>
            </div>

            <span className={`role-tag ${role}`}>
              {role || "user"}
            </span>

          </div>

          <div className="permission-grid">

            {role === "admin" && (
              <div className="permission-card admin-card">

                <span className="permission-icon">
                  🛡️
                </span>

                <div>
                  <h3>Administrator</h3>
                  <p>
                    Full access to create, edit, delete
                    and manage content.
                  </p>
                </div>

              </div>
            )}

            {role === "editor" && (
              <div className="permission-card editor-card">

                <span className="permission-icon">
                  ✏️
                </span>

                <div>
                  <h3>Editor</h3>
                  <p>
                    Create and edit content while
                    managing existing posts.
                  </p>
                </div>

              </div>
            )}

            {role === "viewer" && (
              <div className="permission-card viewer-card">

                <span className="permission-icon">
                  👁️
                </span>

                <div>
                  <h3>Viewer</h3>
                  <p>
                    View available published content
                    in read-only mode.
                  </p>
                </div>

              </div>
            )}

          </div>

          {/* API TEST - ADMIN ONLY */}
          {role === "admin" && (
            <div className="api-section">

              <button
                className="primary-button"
                onClick={testApi}
              >
                🔗 Test Secure API
              </button>

              {message && (
                <div className="api-message">
                  {message}
                </div>
              )}

            </div>
          )}

        </section>

        {/* CONTENT MANAGEMENT */}
        <section className="content-manager">

          <div className="content-heading">

            <div>
              <h2>Content Management</h2>

              <p>
                {role === "admin"
                  ? "Create, edit and manage all content."
                  : role === "editor"
                  ? "Create and edit existing content."
                  : "Browse available published content."
                }
              </p>
            </div>

            <div className={`content-role ${role}`}>
              {role === "admin" && "🛡️ Administrator"}
              {role === "editor" && "✏️ Editor"}
              {role === "viewer" && "👁️ Viewer"}
            </div>

          </div>

          {/* IMPORTANT:
              Same PostManager is used for every role.
              The role is passed so it can decide
              what actions the user is allowed to perform.
          */}
          <PostManager userRole={role} />

        </section>

      </main>

    </div>
  );
}

export default Dashboard;