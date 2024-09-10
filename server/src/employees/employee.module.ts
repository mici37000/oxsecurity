import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeResolver } from './resolvers/employee.resolver';
import { EmployeeService } from './employee.service';
import { EmployeeSchema } from './schemas/employee.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }])],
  providers: [EmployeeResolver, EmployeeService],
})
export class EmployeeModule {}