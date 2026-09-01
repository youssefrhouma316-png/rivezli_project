import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/auth.service.js";
import Header from "../components/Header.jsx";

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const email = localStorage.getItem("resetEmail");
  const code = localStorage.getItem("resetCode");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!password || !confirmPassword) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const data = await resetPassword(email, code, password);
      setMessage(data.message || "Mot de passe réinitialisé avec succès !");

      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetCode");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Impossible de réinitialiser le mot de passe.");
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

          <form onSubmit={handleSubmit} className="reset-grid-form">
            
            <div className="form-group-field">
              <label>New Mot de passe</label>
              <input
                type="password"
                placeholder="Nom et prénom"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group-field">
              <label>Confirmer le mot de passe</label>
              <input
                type="password"
                placeholder="Nom et prénom"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="form-group-field full-span text-center">
              <button type="submit" className="btn-teal-pill btn-medium-pill">
                Next
              </button>
            </div>

          </form>

        </div>
      </main>
    </>
  );
}

export default ResetPassword;