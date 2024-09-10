"use client";
import { useRouter } from 'next/navigation';
import { gql, useMutation } from "@apollo/client";
import { EmployeeStatuses } from "@/app/constants/employee-status.const";
import { EmployeeStatusOption } from "@/app/models/employee-status-option.model";
import { EmployeeStatusEnum } from "@/app/enums/employee-status.enum";

export default function CreateEmployee() {
  const CREATE_EMPLOYEE_MUTATION = gql`
    mutation CreateEmployee($employeeDto: EmployeeDto!) {
      createEmployee(employeeDto: $employeeDto) {
        firstName
        lastName
        status
        image
      }
    }
  `;
  const [createEmployee, { data, loading, error }] = useMutation(CREATE_EMPLOYEE_MUTATION);
  const router = useRouter();

  async function onCreate(formData) {
    const firstName: string = formData.get('firstNameTB');
    const lastName: string = formData.get('lastNameTB');
    const status: EmployeeStatusEnum = formData.get('statusSelect');
    const image: string = formData.get('imageTB');

    try {
      await createEmployee({
        variables: {
          employeeDto: {
            firstName,
            lastName,
            status,
            image
          },
        },
      });
      router.push('/');
    } catch (err) {
      alert('Employee creation has been failed. Please check the console for more info.');
      console.error('Error creating employee:', err);
    }
  }

  return (
    <form className="container mx-auto my-5 px-3 md:px-36" action={onCreate}>
      <div>
        <label htmlFor="firstNameTB" className="block mb-2 text-gray-900">
          First name
        </label>
        <input
          type="text"
          id="firstNameTB"
          name="firstNameTB"
          className="mb-6 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="First name"
          minLength={2}
          maxLength={30}
          required
        />
      </div>
      <div>
        <label htmlFor="lastNameTB" className="block mb-2 text-gray-900">
          Last name
        </label>
        <input
          type="text"
          id="lastNameTB"
          name="lastNameTB"
          className="mb-6 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Last name"
          minLength={2}
          maxLength={30}
          required
        />
      </div>
      <div>
        <label
          htmlFor="statusSelect"
          className="block mb-2 font-medium text-gray-900"
        >
          Status
        </label>
        <select
          id="statusSelect"
          name="statusSelect"
          className="mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        >
          {EmployeeStatuses.map((status: EmployeeStatusOption) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="imageTB" className="block mb-2 text-gray-900">
          Image URL
        </label>
        <input
          type="url"
          id="imageTB"
          name="imageTB"
          className="mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Image URL"
          minLength={10}
          maxLength={200}
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full md:w-auto text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-extrabold rounded-lg text-xl px-5 py-2.5 me-2 mb-2 focus:outline-none"
        >
          Create
        </button>
      </div>
    </form>
  );
}
