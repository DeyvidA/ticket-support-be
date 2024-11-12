import { Module } from '@nestjs/common';
import { Database } from './database';
import { databaseProviders } from './database.providers';

@Module({
  providers: [Database, ...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
