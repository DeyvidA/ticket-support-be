import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        const connection = await mongoose.connect(
          `mongodb://root:example@localhost:27017/nest`,
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
