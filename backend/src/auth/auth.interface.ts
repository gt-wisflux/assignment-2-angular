export interface ISignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  userId: number;
  message: string;
  access_token: string;
}