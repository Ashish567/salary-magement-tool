import { faker } from '@faker-js/faker';
import { COUNTRIES, JOB_TITLES } from '../constants/employee-constants';

export function generateEmployee() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const country = faker.helpers.arrayElement(COUNTRIES);
  const jobTitle = faker.helpers.arrayElement(JOB_TITLES);
  
  // More realistic salary based on job title
  let minSal = 30000;
  let maxSal = 100000;

  if (jobTitle.includes('Senior') || jobTitle.includes('DevOps') || jobTitle.includes('Scientist')) {
    minSal = 80000;
    maxSal = 200000;
  } else if (jobTitle.includes('Manager')) {
    minSal = 100000;
    maxSal = 300000;
  }

  const salary = faker.number.int({ min: minSal, max: maxSal });

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    country,
    jobTitle,
    salary,
    createdAt: new Date(),
    updatedAt: new Date(),
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
