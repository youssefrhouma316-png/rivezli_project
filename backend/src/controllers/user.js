import User from "../models/userSchema.js";
 if (!User) {
    throw new Error("User schema is not defined");
}

if (!User.firstname || !User.lastname || !User.email || !User.university || !User.password || !User.phone || !User.role) {
    throw new Error("saisie le champ obligatoire");
}
