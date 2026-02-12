/**
 * @jest-environment node
 */

import { POST, GET } from '@/app/api/mentors/route';
import { NextRequest } from 'next/server';

describe('/api/mentors', () => {
    describe('POST', () => {
        it('returns 400 when required fields are missing', async () => {
            const req = new NextRequest('http://localhost:3000/api/mentors', {
                method: 'POST',
                body: JSON.stringify({ name: '', email: '' }),
                headers: { 'Content-Type': 'application/json' },
            });

            const res = await POST(req);
            expect(res.status).toBe(400);

            const data = await res.json();
            expect(data.error).toBeDefined();
        });

        it('returns 201 when valid data is submitted', async () => {
            const req = new NextRequest('http://localhost:3000/api/mentors', {
                method: 'POST',
                body: JSON.stringify({
                    name: 'Test Mentor',
                    email: 'test@example.com',
                    expertise: 'AI/ML',
                    experience: '5 years',
                    availability: 'Weekends',
                    goals: 'Giving back',
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            const res = await POST(req);
            expect(res.status).toBe(201);

            const data = await res.json();
            expect(data.message).toContain('successfully');
            expect(data.data.name).toBe('Test Mentor');
        });
    });

    describe('GET', () => {
        it('returns 200 with data array', async () => {
            const res = await GET();
            expect(res.status).toBe(200);

            const data = await res.json();
            expect(Array.isArray(data.data)).toBe(true);
        });
    });
});
