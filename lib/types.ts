import NextAuth from "next-auth";

export type Globals = {
  user: any | null;
  setUser: (state: any) => void;
};

declare module "next-auth" {
  interface Session {
    userId: number;
  }
}
