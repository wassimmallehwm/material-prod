export class User {

  _id: string;
  email: string;
  name: string;
  password: string;
}

export class LoginResponse {
  success: boolean;
  token: string;
}

export class SignupResponse {
  success: boolean;
  message: string;
}

export class LogoutResponse {
  success : boolean;
}
