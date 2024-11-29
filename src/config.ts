import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      userName: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      host: process.env.MONGO_HOST,
      port: process.env.MONGO_PORT,
      dbName: process.env.MONGO_DB,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  };
});
