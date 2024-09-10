import { Field, InputType } from '@nestjs/graphql';
import { EmployeeStatusEnum } from '../enums/employee-status.enum';

@InputType({ description: 'employees' })
export class EmployeeDto {
  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: false })
  status: EmployeeStatusEnum;

  @Field({ nullable: false })
  image: string;
}
