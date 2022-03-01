export type User = {
  _id: string;
  name: string;
  email: string;
  userType: string;
  gender: string;
  age: string;
  phone: string;
  __v: number;
};

export type UserResponse = {
  result: User;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type LoggedInUser = {
  userType: string;
  id: string;
  token: string;
};

export type EditUserBody = {
  email: string;
  name: string;
  phone: string;
  gender: string;
};

export type SignUpBody = {
  name: string;
  email: string;
  password: string;
  userType: string;
  gender: string;
  age: string;
  phone: string;
};

export type ForgotPasswordBody = {
  email: string;
};

export type ResetPasswordBody = {
  password: string;
  password2: string;
};

export type ChangePasswordBody = {
  id: string;
  password: string;
  password2: string;
};

export type UpdateBody = {
  name: string;
  email: string;
  gender: string;
  phone: string;
  id: string;
};

export type SignUpResponse = any;

export type ForgotPasswordResponse = any;

export type ResetPasswordResponse = any;

export type ChangePasswordResponse = any;

export type UpdateResponse = any;

export type LoginResponse = {
  success: boolean;
  user?: {
    id: string;
    token: string;
    userType: string;
  };
  email?: string;
  password?: string;
};
