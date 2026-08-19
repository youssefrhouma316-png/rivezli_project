import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Vérifier que le header Authorization existe
        if (!authHeader) {
            return res.status(401).json({
                message: "Token manquant"
            });
        }

        // Vérifier le format : Bearer TOKEN
        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                message: "Format du token invalide"
            });
        }

        const token = parts[1];

        // Vérifier le JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Stocker les informations du token dans req.user
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token invalide ou expiré"
        });
    }
};

export default authMiddleware;