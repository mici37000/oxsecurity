"use client";
import Link from "next/link";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Employee } from "../models/employee.model";
import EmployeeCard from "./EmployeeCard";

export default function Employees() {
  const GET_ALL_EMPLOYEES_QUERY = gql`
    {
      getAllEmployees {
        id
        firstName
        lastName
        status
        image
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_ALL_EMPLOYEES_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const DELETE_EMPLOYEE_MUTATION = gql`
    mutation DeleteEmployee($id: String!) {
      deleteEmployee(id: $id) {
        id
      }
    }
  `;

  const [deleteEmployee] = useMutation(
    DELETE_EMPLOYEE_MUTATION, {
      refetchQueries: [
        GET_ALL_EMPLOYEES_QUERY,
        'getAllEmployees'
      ]
    }
  );

  const UPDATE_EMPLOYEE_MUTATION = gql`
    mutation updateEmployee($id: String!, $employeeDto: EmployeeDto!) {
      updateEmployee(id: $id, employeeDto: $employeeDto) {
        id
        firstName
        lastName
        status,
        image
      }
    }
  `;

  const [updateEmployee] = useMutation(
    UPDATE_EMPLOYEE_MUTATION
  );

  async function onDeleteEmployee(id: string) {
    try {
      await deleteEmployee({
        variables: {
          id
        },
      });
    } catch (err) {
      alert('Employee deletion has been failed. Please check the console for more info.');
      console.error('Error deleting employee:', err);
    }
  }

  async function onUpdateEmployee(id: string, employeeDto: Employee) {
    try {
      await updateEmployee({
        variables: {
          id,
          employeeDto
        },
      });
    } catch (err) {
      alert('Employee update has been failed. Please check the console for more info.');
      console.error('Error updating employee:', err);
    }
  }

  return (
    <div className="container mx-auto my-5 px-3 md:px-36">
      <Link href="/employees/create">
        <button
          type="button"
          className="w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-extrabold rounded-lg text-xl px-5 py-2.5 me-2 mb-2 focus:outline-none"
        >
          Create +
        </button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
        {data?.getAllEmployees.map((employee: Employee) => (
          <EmployeeCard key={employee.id} employee={employee} onDeleteEmployee={onDeleteEmployee} onUpdateEmployee={onUpdateEmployee} />
        ))}
      </div>
    </div>
  );
}
