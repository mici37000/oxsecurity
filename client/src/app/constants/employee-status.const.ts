import { EmployeeStatusEnum } from "../enums/employee-status.enum";
import { EmployeeStatusOption } from "../models/employee-status-option.model";

export const EmployeeStatuses: EmployeeStatusOption[] = [
  {
    value: EmployeeStatusEnum.WORKING,
    label: "Working",
  },
  {
    value: EmployeeStatusEnum.ON_VACATION,
    label: "Vacation",
  },
  {
    value: EmployeeStatusEnum.LUNCH_TIME,
    label: "Lunch",
  },
  {
    value: EmployeeStatusEnum.BUSINESS_TRIP,
    label: "Business trip",
  },
];
