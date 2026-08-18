import { useState } from "react";
import registerUser from "../services/auth.service.js";

function Register() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    etablissementUniversitaire: "",
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

    // Validation des champs
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.email ||
      !formData.etablissementUniversitaire ||
      !formData.numeroTelephone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    // Vérification des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Données à envoyer au backend
    const userData = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      etablissementUniversitaire:
        formData.etablissementUniversitaire,
      numeroTelephone: formData.numeroTelephone,
      password: formData.password,
      role: formData.role,
    };

    try {
      const data = await registerUser(userData);

      setMessage(data.message);

      // Réinitialiser le formulaire
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        etablissementUniversitaire: "",
        numeroTelephone: "",
        password: "",
        confirmPassword: "",
        role: "student",
      });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Impossible de contacter le serveur.");
      }
    }
  };

  return (
    <div>
      <h1>Créer un compte</h1>

      {message && (
        <p>
          {message}
        </p>
      )}

      {error && (
        <p>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <div>
          <label>Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Prénom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Établissement universitaire</label>
          <input
            type="text"
            name="etablissementUniversitaire"
            value={formData.etablissementUniversitaire}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Numéro de téléphone</label>
          <input
            type="text"
            name="numeroTelephone"
            value={formData.numeroTelephone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Rôle</label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="student">
              Étudiant
            </option>

            <option value="admin">
              Administrateur
            </option>
          </select>
        </div>

        <button type="submit">
          S'inscrire
        </button>

      </form>
    </div>
  );
}

export default Register;