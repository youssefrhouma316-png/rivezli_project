import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header.jsx";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const getProfile = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const response = await axios.get(
          `${API_URL}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.user);

      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          setError("Impossible de récupérer le profil.");
        }
      }
    };

    getProfile();
  }, [navigate]);

  return (
    <>
      <Header />

      <main className="profile-page">
        <div className="profile-card">

          <h1 className="auth-main-title">Mon profil Rivezli</h1>

          {error && <div className="error-message">{error}</div>}

          {user && (
            <div className="profile-info">

              <div className="profile-item">
                <span>Nom</span>
                <strong>{user.nom}</strong>
              </div>

              <div className="profile-item">
                <span>Prénom</span>
                <strong>{user.prenom}</strong>
              </div>

              <div className="profile-item">
                <span>Email</span>
                <strong>{user.email}</strong>
              </div>

              <div className="profile-item">
                <span>Établissement Universitaire</span>
                <strong>{user.etablissementUniversitaire || "-"}</strong>
              </div>

              <div className="profile-item">
                <span>Téléphone</span>
                <strong>{user.numeroTelephone || "-"}</strong>
              </div>

              <div className="profile-item">
                <span>Rôle</span>
                <strong className="text-capitalize">{user.role}</strong>
              </div>

            </div>
          )}

        </div>
      </main>
    </>
  );
}

export default Profile;