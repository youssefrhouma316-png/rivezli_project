import bcrypt from "bcrypt"
import User from "../models/userSchema.js";

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
    const existingUser = await User.find({ email });

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

export default register;