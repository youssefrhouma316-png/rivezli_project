import bcrypt from "bcrypt"
import User from "../models/userSchema.js";
import jwt from 'jsonwebtoken';
import PasswordReset from "../models/PasswordReset.js";
import transporter from "../config/email.js";

const register = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      etablissementUniversitaire,
      numeroTelephone,
      password,
      role,
    } = req.body;

    // 1. Validation des champs
    if (
      !nom ||
      !prenom ||
      !email ||
      !etablissementUniversitaire ||
      !numeroTelephone ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    // Validation du mot de passe (min 8 chars, 1 majuscule, 1 minuscule, 1 chiffre, 1 char spécial)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.",
      });
    }

    // Validation du numéro de téléphone (au moins 8 chiffres)
    const phoneRegex = /^[0-9\s+]{8,15}$/;
    if (!phoneRegex.test(numeroTelephone)) {
      return res.status(400).json({
        message: "Le numéro de téléphone est invalide.",
      });
    }

    // 2. Vérification de l'email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Cet email est déjà utilisé",
      });
    } 

    // 3. Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Création de l'utilisateur
    const user = await User.create({
      nom,
      prenom,
      email,
      etablissementUniversitaire,
      numeroTelephone,
      password: hashedPassword,
      role,
    });

    // 5. Réponse
    return res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "Cet email n'existe pas",
      });
    }

    const passwordIsValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Mot de passe incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: existingUser._id,
        nom: existingUser.nom,
        prenom: existingUser.prenom,
        email: existingUser.email,
        role: existingUser.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }  
};
export const getProfile = async (req, res) => {
    try {
        res.status(200).json({
            message: "Profil récupéré avec succès",
            user: req.user
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Vérifier que l'email est fourni
        if (!email) {
            return res.status(400).json({
                message: "Email obligatoire"
            });
        }

        // Vérifier que l'utilisateur existe
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        // Générer un code à 6 chiffres
        const code = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // Code valable pendant 10 minutes
        const expiresAt = new Date(
            Date.now() + 10 * 60 * 1000
        );

        // Supprimer un ancien code pour cet email
        await PasswordReset.deleteMany({ email });

        // Enregistrer le nouveau code
        await PasswordReset.create({
            email,
            code,
            expiresAt
        });

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER || "noreply@rivezli.tn",
                to: email,
                subject: "Réinitialisation de votre mot de passe - Rivezli.tn",
                text: `Votre code de réinitialisation est : ${code}. Ce code expire dans 10 minutes.`
            });
            console.log(`✉️ Email de réinitialisation envoyé avec succès à ${email}`);
        } catch (emailError) {
            console.error("⚠️ Impossible d'envoyer l'email via SMTP/Gmail (Erreur d'authentification) :", emailError.message);
            console.log(`🔑 [MODE DEV/LOG] Code de réinitialisation généré pour ${email} : >>> ${code} <<<`);
        }

        return res.status(200).json({
            message: "Code de réinitialisation généré avec succès. (Consultez vos emails ou la console en mode dev)"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;

    if (!email || !code || !password) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.",
      });
    }

    const resetRequest = await PasswordReset.findOne({
      email,
      code,
    });

    if (!resetRequest) {
      return res.status(400).json({
        message: "Code de réinitialisation invalide",
      });
    }

    if (resetRequest.expiresAt < new Date()) {
      await PasswordReset.deleteOne({ _id: resetRequest._id });

      return res.status(400).json({
        message: "Le code de réinitialisation a expiré",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    await user.save();

    // Le code ne peut plus être réutilisé
    await PasswordReset.deleteOne({
      _id: resetRequest._id,
    });

    return res.status(200).json({
      message: "Mot de passe réinitialisé avec succès",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

export { register, login};