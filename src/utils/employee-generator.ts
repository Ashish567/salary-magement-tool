import { faker } from '@faker-js/faker';
import { COUNTRIES, JOB_TITLES } from '../constants/employee-constants';

export function generateEmployee() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const country = faker.helpers.arrayElement(COUNTRIES);
  const jobTitle = faker.helpers.arrayElement(JOB_TITLES);
  
  // Realistic salary based on job title/experience simulation
  // Simple range for now: 30k to 300k
  const salary = faker.number.int({ min: 30000, max: 300000 });

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    country,
    jobTitle,
    salary,
  };
}

export function generateEmployees(count: number) {
  const employees = [];
  const emails = new Set<string>();

  while (employees.length < count) {
    const emp = generateEmployee();
    if (!emails.has(emp.email)) {
      emails.add(emp.email);
      employees.push(emp);
    }
  }

  return employees;
}
