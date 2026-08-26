export const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        // Vérifier que l'utilisateur est authentifié
        if (!req.user) {
            return res.status(401).json({
                message: "Utilisateur non authentifié"
            });
        }

        // Vérifier que son rôle est autorisé
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Accès interdit"
            });
        }

        next();
    };
};

