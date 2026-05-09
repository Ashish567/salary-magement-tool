import { describe, it, expect, beforeEach } from 'vitest';
import { GET } from '../../src/app/api/employees/route';
import { prisma } from '../../src/lib/prisma';

describe('Employee Listing API (GET /api/employees)', () => {
  const employees = [
    {
      firstName: 'Alice',
      lastName: 'Smith',
      fullName: 'Alice Smith',
      email: 'alice@example.com',
      country: 'USA',
      jobTitle: 'Developer',
      salary: 80000,
    },
    {
      firstName: 'Bob',
      lastName: 'Jones',
      fullName: 'Bob Jones',
      email: 'bob@example.com',
      country: 'Canada',
      jobTitle: 'Designer',
      salary: 70000,
    },
    {
      firstName: 'Charlie',
      lastName: 'Brown',
      fullName: 'Charlie Brown',
      email: 'charlie@example.com',
      country: 'USA',
      jobTitle: 'Manager',
      salary: 90000,
    },
  ];

  beforeEach(async () => {
    await prisma.employee.deleteMany();
    for (const emp of employees) {
      await prisma.employee.create({ data: emp });
    }
  });

  const createRequest = (params: string = '') => {
    return new Request(`http://localhost:3000/api/employees${params ? `?${params}` : ''}`, {
      method: 'GET',
    });
  };

  it('should return paginated employees', async () => {
    const req = createRequest('page=1&limit=2');
    const res = await GET(req as any);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.employees).toHaveLength(2);
    expect(body.data.pagination).toEqual({
      total: 3,
      totalPages: 2,
      currentPage: 1,
      limit: 2,
    });
  });

  it('should search employees by name', async () => {
    const req = createRequest('search=Alice');
    const res = await GET(req as any);
    const body = await res.json();

    expect(body.data.employees).toHaveLength(1);
    expect(body.data.employees[0].fullName).toBe('Alice Smith');
  });

  it('should filter employees by country', async () => {
    const req = createRequest('country=USA');
    const res = await GET(req as any);
    const body = await res.json();

    expect(body.data.employees).toHaveLength(2);
    expect(body.data.employees.every((e: any) => e.country === 'USA')).toBe(true);
  });

  it('should filter employees by job title', async () => {
    const req = createRequest('jobTitle=Designer');
    const res = await GET(req as any);
    const body = await res.json();

    expect(body.data.employees).toHaveLength(1);
    expect(body.data.employees[0].jobTitle).toBe('Designer');
  });

  it('should sort employees by salary desc', async () => {
    const req = createRequest('sortBy=salary&order=desc');
    const res = await GET(req as any);
    const body = await res.json();

    expect(body.data.employees[0].salary).toBe(90000);
    expect(body.data.employees[2].salary).toBe(70000);
  });

  it('should sort employees by fullName asc', async () => {
    const req = createRequest('sortBy=fullName&order=asc');
    const res = await GET(req as any);
    const body = await res.json();

    expect(body.data.employees[0].fullName).toBe('Alice Smith');
    expect(body.data.employees[1].fullName).toBe('Bob Jones');
    expect(body.data.employees[2].fullName).toBe('Charlie Brown');
  });

  it('should return empty results for unmatched search', async () => {
    const req = createRequest('search=NonExistent');
    const res = await GET(req as any);
    const body = await res.json();

    expect(body.data.employees).toHaveLength(0);
    expect(body.data.pagination.total).toBe(0);
  });

  it('should handle invalid pagination gracefully', async () => {
    const req = createRequest('page=invalid&limit=-5');
    const res = await GET(req as any);
    const body = await res.json();

    expect(res.status).toBe(200); // Defaults to page 1, limit 10/20
    expect(body.success).toBe(true);
  });
});
