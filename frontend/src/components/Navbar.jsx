import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div
        className="navbar-logo"
        onClick={() => navigate("/dashboard")}
      >
        Rivezli
      </div>

      <div className="navbar-links">

        <button onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button onClick={() => navigate("/profile")}>
          Profil
        </button>

        {user?.role === "admin" && (
          <button onClick={() => navigate("/admin")}>
            Administration
          </button>
        )}

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Déconnexion
        </button>

      </div>

    </nav>
  );
}

export default Navbar;