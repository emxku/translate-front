declare global {
  interface Tokens {
    Authorization: "Bearer";
    access_token: string;
    refresh_token: string;
  }

  interface Signin {
    username: string;
    password: string;
  }

  interface Signup {
    username: string;
    password: string;
    repeat_password: string;
  }
}

export {};
