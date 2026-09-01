import { useState } from "react";
import axios from "axios";

function VerifyCode() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!code) {
      setError("Veuillez entrer le code.");
      return;
    }

    if (code.length !== 6) {
      setError("Le code doit contenir 6 chiffres.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/verify-reset-code`,
        {
          email,
          code,
        }
      );

      setMessage(response.data.message);

      // Le code est valide
      localStorage.setItem("resetCode", code);

      window.location.href = "/reset-password";

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

        <h2>Vérification</h2>

        <p className="auth-subtitle">
          Entrez le code à 6 chiffres reçu par email.
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
            <label htmlFor="code">
              Code de vérification
            </label>

            <input
              id="code"
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="000000"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Vérifier le code
          </button>

        </form>

      </div>
    </div>
  );
}

export default VerifyCode;