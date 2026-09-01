import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="dashboard-page">

        <section className="dashboard-header">

          <div>
            <h1>
              Bienvenue{user?.prenom ? `, ${user.prenom}` : ""} 👋
            </h1>

            <p>
              Retrouvez toutes les informations de votre espace Rivezli.
            </p>
          </div>

        </section>

        <section className="dashboard-cards">

          <div className="dashboard-card">
            <h3>Mes informations</h3>
            <p>
              Consultez et gérez vos informations personnelles.
            </p>

            <button onClick={() => navigate("/profile")}>
              Voir mon profil
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Mon espace</h3>
            <p>
              Accédez aux fonctionnalités disponibles sur Rivezli.
            </p>

            <button>
              Consulter
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Activité</h3>
            <p>
              Retrouvez prochainement votre activité sur la plateforme.
            </p>

            <button>
              Voir l'activité
            </button>
          </div>

        </section>

      </main>
    </>
  );
}

export default Dashboard;