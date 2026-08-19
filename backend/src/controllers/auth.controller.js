import bcrypt from "bcrypt"
import User from "../models/userSchema.js";
import jwt from 'jsonwebtoken';

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

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

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

    return res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: existingUser._id,
        nom: existingUser.nom,
        prenom: existingUser.prenom,
        email: existingUser.email,
        role: existingUser.role,
      },
      token: token,
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

export { register, login };