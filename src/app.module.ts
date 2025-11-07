import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
//import { ConfigModule } from '@nestjs/config';

import { ProgramsModule } from './programs/programs.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  

    imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/mvpdb'),
    ProgramsModule,
    UsersModule,
    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
