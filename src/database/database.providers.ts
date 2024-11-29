import { ConfigType } from '@nestjs/config';
import * as mongoose from 'mongoose';
import config from 'src/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (
      configService: ConfigType<typeof config>,
    ): Promise<typeof mongoose> => {
      const { userName, password, host, port, dbName } = configService.database;
      try {
        const connection = await mongoose.connect(
          `mongodb://${userName}:${password}@${host}:${port}/${dbName}`,
        );
        console.log('Database connected successfully');
        return connection;
      } catch (error) {
        console.error('Database connection error:', error);
        throw error;
      }
    },
  },
];

//  provide: 'MONGO',
//     useFactory: async (configService: ConfigType<typeof config>) => {
//       const {
//         connection,
//         user,
//         password,
//         host,
//         port,
//         dbName,
//       } = configService.mongo;
//       const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
//       const client = new MongoClient(uri);
//       await client.connect();
//       const database = client.db(dbName);
//       return database;
//     },
