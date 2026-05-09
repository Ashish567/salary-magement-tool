import { describe, it, expect, beforeEach } from 'vitest';
import { GET } from '../../src/app/api/insights/countries/route';
import { prisma } from '../../src/lib/prisma';

describe('Country Insights API', () => {
  beforeEach(async () => {
    await prisma.employee.deleteMany();
    await prisma.employee.createMany({
      data: [
        { firstName: 'A', lastName: 'B', fullName: 'A B', email: 'cnt1@ex.com', country: 'India', jobTitle: 'Dev', salary: 100000 },
        { firstName: 'C', lastName: 'D', fullName: 'C D', email: 'cnt2@ex.com', country: 'India', jobTitle: 'Dev', salary: 200000 },
        { firstName: 'E', lastName: 'F', fullName: 'E F', email: 'cnt3@ex.com', country: 'USA', jobTitle: 'Dev', salary: 150000 },
      ],
    });
  });

  it('should return correct salary aggregations by country', async () => {
    const req = new Request('http://localhost:3000/api/insights/countries');
    const res = await GET(req as any);
    const body = await res.json();

    expect(res.status).toBe(200);
    const india = body.data.find((c: any) => c.country === 'India');
    expect(india.employeeCount).toBe(2);
    expect(india.minimumSalary).toBe(100000);
    expect(india.maximumSalary).toBe(200000);
    expect(india.averageSalary).toBe(150000);

    const usa = body.data.find((c: any) => c.country === 'USA');
    expect(usa.employeeCount).toBe(1);
    expect(usa.averageSalary).toBe(150000);
  });
});
