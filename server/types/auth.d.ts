/**
 * Type definitions for user session
 * This extends the default UserSession type from nuxt-auth-utils
 */
declare module "#auth-utils" {
  interface User {
    id: number;
    email: string;
  }

  interface UserSession {
    loggedInAt: Date;
  }
}

export {};
