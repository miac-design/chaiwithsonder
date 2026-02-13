/**
 * @jest-environment node
 */

import { POST } from '@/app/api/mentor-approval/route';
import { NextRequest } from 'next/server';

// Mock env
const ORIGINAL_ENV = process.env;

beforeEach(() => {
    process.env = { ...ORIGINAL_ENV, ADMIN_SECRET: 'test-secret-123' };
});

afterAll(() => {
    process.env = ORIGINAL_ENV;
});

describe('/api/mentor-approval', () => {
    it('returns 401 when admin secret is wrong', async () => {
        const req = new NextRequest('http://localhost:3000/api/mentor-approval', {
            method: 'POST',
            body: JSON.stringify({
                applicationId: '1',
                action: 'approve',
                adminSecret: 'wrong-secret',
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const res = await POST(req);
        expect(res.status).toBe(401);
    });

    it('returns 400 when action is invalid', async () => {
        const req = new NextRequest('http://localhost:3000/api/mentor-approval', {
            method: 'POST',
            body: JSON.stringify({
                applicationId: '1',
                action: 'invalid',
                adminSecret: 'test-secret-123',
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const res = await POST(req);
        expect(res.status).toBe(400);
    });

    it('returns 200 when approving with correct secret', async () => {
        const req = new NextRequest('http://localhost:3000/api/mentor-approval', {
            method: 'POST',
            body: JSON.stringify({
                applicationId: '1',
                action: 'approve',
                adminSecret: 'test-secret-123',
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const res = await POST(req);
        expect(res.status).toBe(200);

        const data = await res.json();
        expect(data.message).toContain('approved');
    });

    it('returns 200 when rejecting with correct secret', async () => {
        const req = new NextRequest('http://localhost:3000/api/mentor-approval', {
            method: 'POST',
            body: JSON.stringify({
                applicationId: '2',
                action: 'reject',
                adminSecret: 'test-secret-123',
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const res = await POST(req);
        expect(res.status).toBe(200);

        const data = await res.json();
        expect(data.message).toContain('rejected');
    });
});
