import { useState } from "react";
import { resetPassword } from "../services/auth.service.js";

function ResetPassword() {
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
      const data = await resetPassword(
        email,
        code,
        password
      );

      setMessage(data.message);

      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetCode");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Impossible de contacter le serveur.");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Rivezli</h1>

        <h2>Nouveau mot de passe</h2>

        <p className="auth-subtitle">
          Entrez votre nouveau mot de passe.
        </p>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Nouveau mot de passe</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Confirmer le mot de passe</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Réinitialiser
          </button>

        </form>

      </div>
    </div>
  );
}

export default ResetPassword;