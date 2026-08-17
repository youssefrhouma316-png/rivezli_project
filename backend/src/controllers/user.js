import userSchema from "../models/userSchema.js";
 if (!userSchema) {
    throw new Error("User schema is not defined");
}

if (!userSchema.firstname || !userSchema.lastname || !userSchema.email || !userSchema.university || !userSchema.password || !userSchema.phone || !userSchema.role) {
    throw new Error("saisie le champ obligatoire");
}
