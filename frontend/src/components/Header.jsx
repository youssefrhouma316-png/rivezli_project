import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [coursesOpen, setCoursesOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="header-container">
        
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => navigate(token ? "/dashboard" : "/")}>
          Rivezli.tn
        </div>

        {/* Courses Dropdown */}
        <div className="header-courses-dropdown">
          <button 
            className="courses-btn" 
            onClick={() => setCoursesOpen(!coursesOpen)}
            type="button"
          >
            Les Cours <span className="arrow">⌄</span>
          </button>

          {coursesOpen && (
            <div className="dropdown-menu">
              <Link to="#" onClick={() => setCoursesOpen(false)}>Informatique & Dev</Link>
              <Link to="#" onClick={() => setCoursesOpen(false)}>Mathématiques & Science</Link>
              <Link to="#" onClick={() => setCoursesOpen(false)}>Gestion & Economie</Link>
              <Link to="#" onClick={() => setCoursesOpen(false)}>Langues & Communication</Link>
            </div>
          )}
        </div>

        {/* Center Nav Links */}
        <nav className="header-nav font-medium">
          <Link to="/">Home</Link>
          <Link to="#">About us</Link>
          <Link to="#">Platform</Link>
          <Link to="#">Contact</Link>
        </nav>

        {/* Auth / User Status Action */}
        <div className="header-actions">
          {token && user ? (
            <div className="user-profile-actions">
              <span className="user-name">
                {user.prenom} ({user.role === "admin" ? "Admin" : "Étudiant"})
              </span>

              {user.role === "admin" && (
                <button 
                  className="btn-admin-pill"
                  onClick={() => navigate("/admin")}
                >
                  Admin Portal
                </button>
              )}

              <button className="btn-logout-pill" onClick={handleLogout}>
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="auth-header-btns">
              <button className="btn-login-nav" onClick={() => navigate("/login")}>
                Connexion
              </button>
              <button className="btn-register-nav" onClick={() => navigate("/register")}>
                S'inscrire
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;
