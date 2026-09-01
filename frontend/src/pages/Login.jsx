import { useState } from "react";
import axios from "axios";

function Login() {
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
      setError("Email et mot de passe sont obligatoires.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        formData
      );

      setMessage(response.data.message);

      // Sauvegarder le JWT
      localStorage.setItem("token", response.data.token);

      // Sauvegarder les informations utilisateur
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      console.log("Connexion réussie :", response.data);

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

        <h2>Connexion</h2>

        <p className="auth-subtitle">
          Connectez-vous à votre compte
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
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Votre adresse email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Votre mot de passe"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="forgot-password">
            <a href="/forgot-password">
              Mot de passe oublié ?
            </a>
          </div>

          <button type="submit" className="auth-button">
            Se connecter
          </button>

        </form>

        <div className="auth-footer">
          <span>Vous n'avez pas encore de compte ?</span>

          <a href="/register">
            Créer un compte
          </a>
        </div>

      </div>
    </div>
  );
}

export default Login;