import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { NotFoundException } from '@nestjs/common';
import { EmployeeDto } from '../dto/employee.dto';

@Resolver((of) => Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

  @Query((returns) => [Employee])
  async getAllEmployees() {
    const employees: Employee[] = await this.employeeService.findAll();

    if (!employees) {
      throw new NotFoundException('Failed fetching employee from DB');
    }

    return employees;
  }

  @Query((returns) => Employee)
  async getEmployeeById(@Args('id', { type: () => String }) id: string) {
    const employee: Employee = await this.employeeService.findOne(id);

    if (!employee) {
      throw new NotFoundException(id);
    }

    return employee;
  }

  @Mutation((returns) => Employee)
  async createEmployee(@Args('employeeDto') employeeDto: EmployeeDto): Promise<Employee> {
    const createdEmployee: Employee = await this.employeeService.create(employeeDto);
    return createdEmployee;
  }

  @Mutation((returns) => Employee)
  async updateEmployee(
    @Args('id') id: string,
    @Args('employeeDto') employeeDto: EmployeeDto
  ): Promise<Employee> {
    const updatedEmployee: Employee = await this.employeeService.update(id, employeeDto);

    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return updatedEmployee;
  }

  @Mutation(() => Employee)
  async deleteEmployee(@Args('id') id: string): Promise<boolean> {
    return this.employeeService.delete(id);
  }
}
