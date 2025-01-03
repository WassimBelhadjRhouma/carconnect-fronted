import axios, { AxiosResponse } from "axios";
import { LoginUserData, SignUpUserData } from "../types/api";
import { handleApiError } from "../utils/ErrorHandler";
import { log } from "node:console";

const API_URL = "https://localhost:8443/api/auth"; 


export const authService = {

  registerUser: async (data: SignUpUserData): Promise<AxiosResponse<any>> => {
    try {
      const response= await axios.post(`${API_URL}/register`, data);
      return response.data
    } catch (error: any) {      
      throw handleApiError(error)
    }
  },
  logInUser: async (data: LoginUserData): Promise<AxiosResponse<any>> => {
    try {
      const response= await axios.post(`${API_URL}/login`, data);
      console.log(response);
      
      return response.data
    } catch (error: any) {      
      throw handleApiError(error)
    }
  },

}
