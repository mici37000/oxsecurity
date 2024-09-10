import * as mongoose from 'mongoose';
import { EmployeeStatusEnum } from '../enums/employee-status.enum';

export const EmployeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  status: {
    type: String,
    enum: Object.values(EmployeeStatusEnum),
  },
  image: String,
});

EmployeeSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

EmployeeSchema.set('toJSON', {
  virtuals: true
});
