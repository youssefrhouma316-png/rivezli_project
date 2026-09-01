import { useState } from "react";

function VerifyCode() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (code.length !== 6) {
      setError("Le code doit contenir 6 chiffres.");
      return;
    }

    localStorage.setItem("resetCode", code);

    window.location.href = "/reset-password";
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Rivezli</h1>

        <h2>Vérification</h2>

        <p className="auth-subtitle">
          Entrez le code reçu par email.
        </p>

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
                setCode(
                  e.target.value.replace(/\D/g, "")
                )
              }
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Continuer
          </button>

        </form>

      </div>
    </div>
  );
}

export default VerifyCode;