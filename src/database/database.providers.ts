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
    inject: [config.KEY],
  },
];
