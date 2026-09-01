import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Configuration du transporteur d'email
const createEmailTransporter = () => {
  const isGmail = !process.env.EMAIL_HOST || process.env.EMAIL_HOST.includes("gmail");

  if (isGmail) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const transporter = createEmailTransporter();

export default transporter;