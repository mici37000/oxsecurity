import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employees/employee.module';

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const dbConnectionOptions: MongooseModuleOptions = {
  dbName: process.env.DB_NAME
};

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_HOST, dbConnectionOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'schema.gql',
      sortSchema: true
    }),
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  async onModuleDestroy() {
    await mongoose.disconnect();
  }
}
