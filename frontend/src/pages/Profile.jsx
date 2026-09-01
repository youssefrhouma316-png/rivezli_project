import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

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
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.user);

      } catch (error) {
        console.error(error);

        if (error.response?.status === 401) {
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
      <Navbar />

      <main className="profile-page">

        <div className="profile-card">

          <h1>Mon profil</h1>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

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
                <span>Établissement</span>
                <strong>
                  {user.etablissementUniversitaire || "-"}
                </strong>
              </div>

              <div className="profile-item">
                <span>Téléphone</span>
                <strong>
                  {user.numeroTelephone || "-"}
                </strong>
              </div>

              <div className="profile-item">
                <span>Rôle</span>
                <strong>{user.role}</strong>
              </div>

            </div>
          )}

        </div>

      </main>
    </>
  );
}

export default Profile;