declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_CLIENT_ID: "string";
    GOOGLE_CLIENT_SECRET: "string";
    GOOGLE_API_KEY: "string";
    NEXTAUTH_URL: "string";
    NEXTAUTH_SECRET: "string";
    DATABASE_URL: "string";
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: "string";
    STRIPE_SECRET_KEY: "string";
  }
}
