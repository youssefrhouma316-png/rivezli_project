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

export const updateMe = async (req, res) => {
    try {
        // ID récupéré depuis le JWT
        const userId = req.user.id;

        // Récupérer uniquement les champs autorisés
        const {
            nom,
            prenom,
            etablissementUniversitaire,
            numeroTelephone
        } = req.body;

        // Chercher l'utilisateur
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        // Mettre à jour uniquement les champs envoyés
        if (nom !== undefined) {
            user.nom = nom;
        }

        if (prenom !== undefined) {
            user.prenom = prenom;
        }

        if (etablissementUniversitaire !== undefined) {
            user.etablissementUniversitaire = etablissementUniversitaire;
        }

        if (numeroTelephone !== undefined) {
            user.numeroTelephone = numeroTelephone;
        }

        // Sauvegarder
        await user.save();

        // Retourner les informations mises à jour
        return res.status(200).json({
            message: "Profil mis à jour avec succès",
            user: {
                id: user._id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                etablissementUniversitaire: user.etablissementUniversitaire,
                numeroTelephone: user.numeroTelephone,
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