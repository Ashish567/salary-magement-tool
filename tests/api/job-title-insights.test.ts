import { describe, it, expect, beforeEach } from 'vitest';
import { GET } from '../../src/app/api/insights/job-titles/route';
import { prisma } from '../../src/lib/prisma';

describe('Job Title Insights API', () => {
  beforeEach(async () => {
    await prisma.employee.deleteMany();
    await prisma.employee.createMany({
      data: [
        { firstName: 'A', lastName: 'B', fullName: 'A B', email: 'job1@ex.com', country: 'India', jobTitle: 'Software Engineer', salary: 100000 },
        { firstName: 'C', lastName: 'D', fullName: 'C D', email: 'job2@ex.com', country: 'India', jobTitle: 'Software Engineer', salary: 140000 },
        { firstName: 'E', lastName: 'F', fullName: 'E F', email: 'job3@ex.com', country: 'India', jobTitle: 'Product Manager', salary: 150000 },
      ],
    });
  });

  it('should return average salary for a specific job title in a country', async () => {
    const params = new URLSearchParams({ country: 'India', jobTitle: 'Software Engineer' });
    const req = new Request(`http://localhost:3000/api/insights/job-titles?${params.toString()}`);
    const res = await GET(req as any);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data.averageSalary).toBe(120000);
    expect(body.data.employeeCount).toBe(2);
  });

  it('should return 404 if no data found for the criteria', async () => {
    const params = new URLSearchParams({ country: 'Mars', jobTitle: 'Alien' });
    const req = new Request(`http://localhost:3000/api/insights/job-titles?${params.toString()}`);
    const res = await GET(req as any);
    expect(res.status).toBe(404);
  });
});
