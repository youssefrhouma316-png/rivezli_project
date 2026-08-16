import connectDB from "./config/databse.js";
import dotenv from 'dotenv';
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT ;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();