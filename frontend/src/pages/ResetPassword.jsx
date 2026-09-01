import { useState } from "react";
import axios from "axios";

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reset-password`,
        {
          email,
          code,
          password,
        }
      );

      setMessage(response.data.message);

      // Nettoyage
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetCode");

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
          Choisissez votre nouveau mot de passe.
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
            <label htmlFor="password">
              Nouveau mot de passe
            </label>

            <input
              id="password"
              type="password"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirmer le mot de passe
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirmer le mot de passe"
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
            Modifier le mot de passe
          </button>

        </form>

        <div className="auth-footer">
          <a href="/login">
            Retour à la connexion
          </a>
        </div>

      </div>
    </div>
  );
}

export default ResetPassword;