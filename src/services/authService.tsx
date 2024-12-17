import axios from "axios";

const API_URL = "https://localhost:8443/api/auth"; // Replace with your backend URL

export const registerUser = async (data: {
  email: string;
  password: string;
}): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    console.log("Registration Successful:", response.data);
  } catch (error: any) {
    console.error(
      "Registration Failed:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
