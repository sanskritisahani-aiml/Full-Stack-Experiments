import { getUserFromToken, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Admin() {
  const user = getUserFromToken();
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>🛡️ Admin Panel</h1>

      <h2>Welcome, {user?.username}</h2>

      <p>Only Admin users should access this page.</p>

      <br />

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        style={{ marginLeft: "10px" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Admin;