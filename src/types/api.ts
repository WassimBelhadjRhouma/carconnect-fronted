// types/api.ts
export interface LoginRequest {
    email: string;
    password: string;
  }

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
  