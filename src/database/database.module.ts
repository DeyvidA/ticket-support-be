import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { database } = configService;

        return {
          uri: `mongodb://${database.userName}:${database.password}@${database.host}:${database.port}`,
          dbName: database.dbName,
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
