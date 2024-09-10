import { EmployeeStatusEnum } from "../enums/employee-status.enum";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  status: EmployeeStatusEnum;
  image: string;
}
