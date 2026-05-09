import { describe, it, expect } from 'vitest';
import { GET } from '../../src/app/api/employees/route';

describe('API Hardening', () => {
  it('should reject invalid sort fields', async () => {
    const req = new Request('http://localhost:3000/api/employees?sortBy=password');
    const res = await GET(req as any);
    // Should fallback to default or return error
    // According to requirements: "invalid sort fields rejected"
    expect(res.status).toBe(400);
  });

  it('should sanitize invalid pagination values', async () => {
    const req = new Request('http://localhost:3000/api/employees?page=-1&limit=abc');
    const res = await GET(req as any);
    const body = await res.json();
    
    // Should fallback to defaults (page 1, limit 10)
    expect(res.status).toBe(200);
    expect(body.data.pagination.page).toBe(1);
    expect(body.data.pagination.limit).toBe(10);
  });
});
