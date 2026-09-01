import { useState } from "react";
import axios from "axios";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      setError("Veuillez entrer votre adresse email.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/forgot-password`,
        { email }
      );

      setMessage(response.data.message);

      // On garde l'email pour l'étape OTP
      localStorage.setItem("resetEmail", email);

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

        <h2>Mot de passe oublié</h2>

        <p className="auth-subtitle">
          Entrez votre email pour recevoir un code de réinitialisation.
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
            <label htmlFor="email">
              Adresse email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Envoyer le code
          </button>

        </form>

        <div className="auth-footer">
          <a href="/login">
            ← Retour à la connexion
          </a>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;