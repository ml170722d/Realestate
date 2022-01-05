namespace NodeJS {
  interface ProccessEnv extends NodeJS.ProccessEnv {
    DATABASE_URL: string;
    SECRET: string;
    HOST: string;
  }
}
