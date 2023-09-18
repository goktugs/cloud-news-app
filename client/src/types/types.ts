export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  id: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
