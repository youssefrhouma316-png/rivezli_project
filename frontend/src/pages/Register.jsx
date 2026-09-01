import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service.js";
import Header from "../components/Header.jsx";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomPrenom: "",
    etablissementUniversitaire: "",
    email: "",
    numeroTelephone: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (
      !formData.nomPrenom ||
      !formData.email ||
      !formData.etablissementUniversitaire ||
      !formData.numeroTelephone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Split nom and prenom
    const nameParts = formData.nomPrenom.trim().split(" ");
    const nom = nameParts[0] || formData.nomPrenom;
    const prenom = nameParts.slice(1).join(" ") || " ";

    const userData = {
      nom,
      prenom,
      email: formData.email,
      etablissementUniversitaire: formData.etablissementUniversitaire,
      numeroTelephone: formData.numeroTelephone,
      password: formData.password,
      role: formData.role,
    };

    try {
      const data = await registerUser(userData);
      setMessage(data.message || "Compte créé avec succès ! Redirection...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Impossible de contacter le serveur backend.");
      }
    }
  };

  return (
    <>
      <Header />

      <main className="auth-page-wrapper center-wrapper">
        <div className="signup-presentation-container">
          
          <h1 className="auth-main-title text-center">Créer votre compte 👋</h1>
          <p className="auth-main-subtitle text-center">
            Créer un compte à Rivezli et commencer à apprendre!
          </p>

          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="signup-grid-form">
            
            {/* Row 1 */}
            <div className="form-group-field">
              <label>Nom et prénom</label>
              <input
                type="text"
                name="nomPrenom"
                placeholder="Nom et prénom"
                value={formData.nomPrenom}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-field">
              <label>Etablissement Universitaire</label>
              <input
                type="text"
                name="etablissementUniversitaire"
                placeholder="Etablissement Universitaire"
                value={formData.etablissementUniversitaire}
                onChange={handleChange}
              />
            </div>

            {/* Row 2 */}
            <div className="form-group-field">
              <label>Adresse e-mail</label>
              <input
                type="email"
                name="email"
                placeholder="e-mail"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-field">
              <label>Num Tel</label>
              <input
                type="text"
                name="numeroTelephone"
                placeholder="Num tel"
                value={formData.numeroTelephone}
                onChange={handleChange}
              />
            </div>

            {/* Row 3 */}
            <div className="form-group-field">
              <label>Mot de passe</label>
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-field">
              <label>Confirmer le mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmer le mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Row 4: Role */}
            <div className="form-group-field full-span">
              <label>Rôle de l'utilisateur</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="select-custom"
              >
                <option value="student">Étudiant</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>

            {/* Submit button */}
            <div className="form-group-field full-span text-center">
              <button type="submit" className="btn-teal-pill btn-medium-pill">
                Créer un compte
              </button>
            </div>

          </form>

          <div className="signup-footer-link text-center">
            Vous avez un compte déjà?{" "}
            <span onClick={() => navigate("/login")}>Se connecter</span>
          </div>

        </div>
      </main>
    </>
  );
}

export default Register;