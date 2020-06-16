export class User {

  _id: string;
  email: string;
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
