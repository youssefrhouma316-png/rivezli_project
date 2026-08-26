import express from "express";
import { getMe,updateMe } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);

router.put("/me", authMiddleware, updateMe);

router.get(
    "/admin-test",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {
        return res.status(200).json({
            message: "Bienvenue dans la zone administrateur"
        });
    }
);


export default router;