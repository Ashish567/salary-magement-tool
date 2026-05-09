import { z } from 'zod';

export const MIN_NAME_LENGTH = 2;
export const MIN_COUNTRY_LENGTH = 2;
export const MIN_JOB_TITLE_LENGTH = 2;

export const employeeSchema = z.object({
  firstName: z.string().min(MIN_NAME_LENGTH, `First name must be at least ${MIN_NAME_LENGTH} characters`),
  lastName: z.string().min(MIN_NAME_LENGTH, `Last name must be at least ${MIN_NAME_LENGTH} characters`),
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  country: z.string().min(MIN_COUNTRY_LENGTH, `Country must be at least ${MIN_COUNTRY_LENGTH} characters`),
  jobTitle: z.string().min(MIN_JOB_TITLE_LENGTH, `Job title must be at least ${MIN_JOB_TITLE_LENGTH} characters`),
  salary: z.number().positive('Salary must be greater than 0'),
});
