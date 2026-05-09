import { z } from 'zod';
import { employeeSchema } from '../validations/employee.schema';

export type Employee = z.infer<typeof employeeSchema> & {
	id: string;
	createdAt: string;
	updatedAt: string;
};
