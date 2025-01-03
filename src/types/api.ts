// types/api.ts

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
  }
  

  export interface LoginUserData {
    email: string;
    password: string;
  }