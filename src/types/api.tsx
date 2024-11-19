// types/api.ts
export interface LoginRequest {
    email: string;
    password: string;
  }
  
export interface SignUpRequest {
    email: string;
    password: string;
    confirmPassword: string;
  }

  
  export interface LoginResponse {
    token: string; // You can add more fields if your API returns them (e.g., user details)
  }
  