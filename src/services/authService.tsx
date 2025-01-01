import axios, { AxiosResponse } from "axios";
import { SignUpUserData } from "../types/api";
import { handleApiError } from "../utils/ErrorHandler";

const API_URL = "https://localhost:8443/api/auth"; 


export const authService = {

  registerUser: async (data): Promise<AxiosResponse<any>> => {
    try {
      const response= await axios.post(`${API_URL}/register`, data);
      return response.data
    } catch (error: any) {      
      throw handleApiError(error)
    }
  },

}
