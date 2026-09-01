import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

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
      <Header />

      <main className="dashboard-page">
        <div className="dashboard-main-container">

          <section className="dashboard-header">
            <div>
              <span className="student-badge">ESPACE ÉTUDIANT</span>
              <h1>Bienvenue{user?.prenom ? `, ${user.prenom}` : ""} 👋</h1>
              <p>
                Retrouvez toutes les ressources de cours et informations de votre compte Rivezli.tn.
              </p>
            </div>
          </section>

          <section className="dashboard-cards">

            <div className="dashboard-card">
              <div className="card-icon">👤</div>
              <h3>Mes informations</h3>
              <p>
                Consultez et mettez à jour vos données personnelles et votre établissement.
              </p>
              <button className="btn-card-teal" onClick={() => navigate("/profile")}>
                Voir mon profil
              </button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">📚</div>
              <h3>Mes Cours & Formations</h3>
              <p>
                Accédez à la liste complète de vos cours et supports pédagogiques.
              </p>
              <button className="btn-card-teal">
                Consulter les cours
              </button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">📊</div>
              <h3>Mon Activité & Progression</h3>
              <p>
                Suivez votre progression et vos statistiques d'apprentissage en temps réel.
              </p>
              <button className="btn-card-teal">
                Voir l'activité
              </button>
            </div>

          </section>

        </div>
      </main>
    </>
  );
}

export default Dashboard;