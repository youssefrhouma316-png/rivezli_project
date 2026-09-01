import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header.jsx";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!formData.email || !formData.password) {
      setError("Veuillez remplir l'adresse email et le mot de passe.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        formData
      );

      setMessage(response.data.message);

      // Sauvegarder le JWT et l'utilisateur
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirection automatique selon le rôle
      setTimeout(() => {
        if (response.data.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 500);

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Impossible de contacter le serveur backend.");
      }
    }
  };

  return (
    <>
      <Header />

      <main className="auth-page-wrapper">
        <div className="login-presentation-container">
          
          {/* LEFT SIDE: LOGIN FORM */}
          <div className="login-form-side">
            
            <h1 className="auth-main-title">Se connecter 👋</h1>
            <p className="auth-main-subtitle">
              Créer un compte à Rivezli et commencer à apprendre!
            </p>

            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form-layout">
              
              <div className="form-group-field">
                <label>Nom et prénom</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Nom et prénom"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-field">
                <label>Confirmer le mot de passe</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Nom et prénom"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="forgot-password-link">
                <span onClick={() => navigate("/forgot-password")}>
                  Forget Password ?
                </span>
              </div>

              <button type="submit" className="btn-teal-pill btn-full">
                Se Connecter
              </button>

            </form>

            <div className="auth-divider-text">
              <span>Pas De Comte ?</span>
            </div>

            <button
              type="button"
              className="btn-outline-teal-pill btn-full"
              onClick={() => navigate("/register")}
            >
              Créer un compte
            </button>

          </div>

          {/* RIGHT SIDE: DARK TEAL PROMO CARD */}
          <div className="login-promo-side">
            <div className="promo-card-content">
              
              <p className="promo-description">
                Débloquez votre avenir avec notre plateforme et démarrez votre carrière avec succès. Commencez à façonner votre chemin vers la réussite dès aujourd'hui !
              </p>

              <h2 className="promo-heading">
                Débloquez le succès<br />avec notre plateforme
              </h2>
              
              <div className="promo-underline"></div>

            </div>

            {/* Subtle background curved overlay */}
            <div className="promo-bg-wave"></div>
          </div>

        </div>
      </main>
    </>
  );
}

export default Login;