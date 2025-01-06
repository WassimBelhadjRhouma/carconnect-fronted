import axios, { AxiosResponse } from "axios";
import { LoginResponse, LoginUserData, SignUpUserData } from "../interfaces/AuthInterfaces";
import { handleApiError } from "../utils/ErrorHandler";
import { User } from "../interfaces/UserInterfaces";

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
  logInUser: async (data: LoginUserData): Promise<LoginResponse> => {
    try {
      const response= await axios.post(`${API_URL}/login`, data);
      const loginRes = {user: userMaker(response.data), token: response.data.token}         
      return loginRes;
    } catch (error: any) {      
      throw handleApiError(error)
    }
  },

}

const userMaker = (data): User => {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    userId: data.userId,
  }
}