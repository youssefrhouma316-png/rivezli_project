import User from "../models/userSchema.js";

export const getMe = async (req, res) => {
    try {
        // ID récupéré depuis le JWT
        const userId = req.user.id;

        // Chercher l'utilisateur dans la base
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        // Ne jamais retourner le mot de passe
        return res.status(200).json({
            user: {
                id: user._id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
};