import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../models/employee.model';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeStatusEnum } from './enums/employee-status.enum';
import { randomUUID } from 'crypto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
  ) {}

  public async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  public async findOne(id: string): Promise<Employee> {
    return this.employeeModel.findById(id).exec();
  }

  async create(dto: EmployeeDto): Promise<Employee> {
    const saved = new this.employeeModel(dto);

    return saved.save();
  }

  async update(id: string, dto: EmployeeDto): Promise<Employee> {
    const updated = await this.employeeModel.findByIdAndUpdate(id, dto, {
      new: true
    });

    return updated;
  }

  public async delete(id: string): Promise<any> {
    const deleted = await this.employeeModel.findByIdAndDelete(id);
    return deleted;
  }
}
