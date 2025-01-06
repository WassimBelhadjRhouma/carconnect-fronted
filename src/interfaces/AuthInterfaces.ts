// types/api.ts

import { User } from "./UserInterfaces";

export interface SignUpUserData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }

    
export interface SignUpForm extends SignUpUserData{
  confirmPassword: string;
}

  
  export interface LoginResponse {
    token: string;
    user: User;
  }
  

  export interface LoginUserData {
    email: string;
    password: string;
  }