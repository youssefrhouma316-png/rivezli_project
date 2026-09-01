import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";

function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const response = await axios.get(
          `${API_URL}/users/admin-test`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAdminData(response.data);

        // Fetch active admin profile
        const profileRes = await axios.get(
          `${API_URL}/auth/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        // Put active admin in state list
        if (profileRes.data?.user) {
          setUsers([
            profileRes.data.user,
            {
              id: "2",
              nom: "Ben Ali",
              prenom: "Ahmed",
              email: "ahmed.student@esprit.tn",
              etablissementUniversitaire: "ESPRIT",
              numeroTelephone: "22334455",
              role: "student"
            },
            {
              id: "3",
              nom: "Trabelsi",
              prenom: "Sarra",
              email: "sarra.admin@insat.tn",
              etablissementUniversitaire: "INSAT",
              numeroTelephone: "99887766",
              role: "admin"
            }
          ]);
        }

      } catch (err) {
        setError(err.response?.data?.message || "Erreur de chargement du portail admin.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminInfo();
  }, [token]);

  return (
    <>
      <Header />

      <main className="dashboard-page admin-dashboard-page">
        <div className="admin-container">
          
          {/* Admin Header Banner */}
          <section className="dashboard-header admin-banner">
            <div>
              <span className="admin-badge">PORTAIL ADMINISTRATEUR</span>
              <h1>Espace d'Administration Rivezli 🛠️</h1>
              <p>
                {adminData?.message || "Bienvenue dans la zone d'administration sécurisée."}
              </p>
            </div>
          </section>

          {error && <div className="error-message">{error}</div>}

          {/* Admin Stats Grid */}
          <section className="admin-stats-grid">
            <div className="stat-card">
              <span className="stat-number">24</span>
              <span className="stat-label">Utilisateurs inscrits</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">18</span>
              <span className="stat-label">Étudiants actifs</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">6</span>
              <span className="stat-label">Administrateurs</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Système opérationnel</span>
            </div>
          </section>

          {/* User Management Section */}
          <section className="admin-users-section">
            <div className="section-header-title">
              <h2>Gestion des Utilisateurs & Rôles</h2>
              <p>Consultez et gérez les comptes enregistrés sur la plateforme.</p>
            </div>

            {loading ? (
              <p>Chargement des utilisateurs...</p>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Nom & Prénom</th>
                      <th>Email</th>
                      <th>Établissement</th>
                      <th>Téléphone</th>
                      <th>Rôle</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, idx) => (
                      <tr key={u.id || idx}>
                        <td className="font-semibold">{u.nom} {u.prenom}</td>
                        <td>{u.email}</td>
                        <td>{u.etablissementUniversitaire || "-"}</td>
                        <td>{u.numeroTelephone || "-"}</td>
                        <td>
                          <span className={`role-pill ${u.role}`}>
                            {u.role === "admin" ? "Administrateur" : "Étudiant"}
                          </span>
                        </td>
                        <td>
                          <span className="status-dot online">● Actif</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

        </div>
      </main>
    </>
  );
}

export default AdminDashboard;
