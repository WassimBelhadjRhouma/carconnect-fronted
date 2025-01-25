export interface SignUpUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SignUpForm extends SignUpUserData {
  confirmPassword: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  firstName: string;
  lastName: string;
  role: USER_TYPES;
}
export enum USER_TYPES {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface LoginUserData {
  email: string;
  password: string;
}
