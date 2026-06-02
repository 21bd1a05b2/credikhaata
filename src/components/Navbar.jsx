import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCredit } from "../context/CreditContext";
import { toast } from "react-toastify";



function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const {
    darkMode,
    toggleTheme,
  } = useCredit();

  const handleLogout = () => {
    logout();

    toast.success("Logged out");

    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
        padding: "15px 0",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2
        style={{
          color: "#109d8f",
        }}
      >
        CrediKhaata
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span>
          {user?.email}
        </span>

        <button
          onClick={toggleTheme}
          className="btn-primary"
          style={{
            width: "auto",
            padding: "8px 12px",
          }}
        >
          {darkMode
            ? "☀ Light"
            : "🌙 Dark"}
        </button>

        <button
          onClick={handleLogout}
          className="btn-primary"
          style={{
            width: "auto",
            padding: "8px 12px",
            background: "#dc3545",
          }}
        >
          Logout
        </button>
        
        
      </div>
    </nav>
  );
}

export default Navbar;