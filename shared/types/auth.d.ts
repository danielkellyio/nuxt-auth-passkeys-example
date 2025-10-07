// shared/types/auth.d.ts
declare module "#auth-utils" {
  interface User {
    email: string;
    name: string;
  }

  interface UserSession {
    user: User;
    loggedInAt: Date;
  }

  // interface SecureSessionData {
  //   // Add your own fields
  // }
}

export {};
