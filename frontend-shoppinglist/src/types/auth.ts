export interface User {
  id: string;
  name: string;      
  lname: string;     
  pseudo: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
