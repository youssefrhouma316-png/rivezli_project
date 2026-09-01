import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/auth/register`,
    userData
  );
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    userData
  );
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(
    `${API_URL}/auth/forgot-password`,
    { email }
  );
  return response.data;
};

export const resetPassword = async (email, code, password) => {
  const response = await axios.post(
    `${API_URL}/auth/reset-password`,
    {
      email,
      code,
      password,
    }
  );
  return response.data;
};