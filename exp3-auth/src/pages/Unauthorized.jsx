import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🚫 Access Denied</h1>

      <p>You are not authorized to access this page.</p>

      <button onClick={() => navigate("/")}>
        Go to Login
      </button>
    </div>
  );
}

export default Unauthorized;