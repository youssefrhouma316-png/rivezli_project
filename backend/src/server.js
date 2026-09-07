import connectDB from "./config/database.js";
import dotenv from 'dotenv';
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT ;

const startServer = async () => {
  // Démarrer le serveur HTTP immédiatement
  app.listen(PORT, () => {
    console.log(` Serveur Rivezli Backend en ligne sur le port ${PORT}`);
    console.log(` URL API : http://localhost:${PORT}/api`);
  });

  // Tenter la connexion MongoDB en arrière-plan
  await connectDB();
};

startServer();