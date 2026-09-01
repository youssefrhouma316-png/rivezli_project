import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header.jsx";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Veuillez saisir votre adresse email.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/forgot-password`,
        { email }
      );

      setMessage(response.data.message || "Code envoyé par email !");
      localStorage.setItem("resetEmail", email);

      // Auto redirect to verify code page
      setTimeout(() => {
        navigate("/verify-code");
      }, 1000);

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Impossible de contacter le serveur.");
      }
    }
  };

  return (
    <>
      <Header />

      <main className="auth-page-wrapper center-wrapper">
        <div className="reset-presentation-container">
          
          <h1 className="auth-main-title text-center">Mot de pass oublier</h1>
          <p className="auth-main-subtitle text-center">
            You received a code check you email
          </p>

          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="reset-form-single">
            
            <div className="form-group-field">
              <label>Adresse e-mail</label>
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn-teal-pill btn-medium-pill">
                Envoyer le code
              </button>
            </div>

          </form>

          <div className="signup-footer-link text-center">
            <span onClick={() => navigate("/login")}>← Retour à la connexion</span>
          </div>

        </div>
      </main>
    </>
  );
}

export default ForgotPassword;