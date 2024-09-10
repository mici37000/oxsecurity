import React, { useState } from "react";
import Image from "next/image";
import { Employee } from "../models/employee.model";
import styles from "./EmployeeCard.module.scss";
import { EmployeeStatuses } from "../constants/employee-status.const";
import { EmployeeStatusOption } from "../models/employee-status-option.model";
import { EmployeeStatusEnum } from "../enums/employee-status.enum";

interface EmployeeCardProps {
  employee: Employee;
  onDeleteEmployee: (id: string) => void;
  onUpdateEmployee: (id: string, employeeDto: Employee) => void;
}

export default function EmployeeCard({ employee, onDeleteEmployee, onUpdateEmployee }: EmployeeCardProps) {
  const [status, setStatus] = useState(employee.status);

  function onStatusChange(status: EmployeeStatusEnum) {
    setStatus(status);
    const updatedEmployee = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      status,
      image: employee.image
    };
    onUpdateEmployee(employee.id, updatedEmployee);
  }

  return (
    <div
      className={`${styles.card} rounded-md shadow-lg shadow-gray-200 hover:shadow-blue-200 p-4`}
    >
      <div className="flex mb-5">
        <Image
          src={employee.image}
          width={128}
          height={128}
          alt={`${employee.firstName} ${employee.lastName}`}
          className={`${styles.thumb} thumb rounded-full basis-0.5`}
        />
        <div className="info basis-0.5 grow pl-4 flex flex-col justify-end">
          <div className="name text-xl">
            {employee.firstName} {employee.lastName}
          </div>
          <div className="status flex items-center">
            <div className={`${styles.circle} ${styles[status]}`}></div>
            <select
              className="indent-2 block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              required
            >
              {EmployeeStatuses.map((status: EmployeeStatusOption) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2"
          onClick={()=> onDeleteEmployee(employee.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
