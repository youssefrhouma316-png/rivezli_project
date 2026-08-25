import express from "express"
import cors from "cors"
import router from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Authentication API is running",
  });
});

app.use("/api/auth", router);
app.use("/api/users", userRoutes);

export default app;