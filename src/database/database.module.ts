import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost:27017`, {
      pass: 'example',
      user: 'root',
      dbName: 'nest',
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
