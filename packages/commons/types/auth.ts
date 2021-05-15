/* eslint-disable @typescript-eslint/no-namespace */
export namespace Auth {
  export type Role = "admin" | "user" | "guest";
  export interface UserClaims {
    id: number;
    roles: Role[];
  }
  export interface User {
    id: string;
    email: string;
    emailVerified: boolean;
    displayName: string;
    role: Role;
  }
}
