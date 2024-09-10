import { Field, ID, ObjectType } from '@nestjs/graphql';
import { EmployeeStatusEnum } from '../employees/enums/employee-status.enum';

@ObjectType({ description: 'employees' })
export class Employee {
  @Field((type) => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  status: EmployeeStatusEnum;

  @Field()
  image: string;
}
