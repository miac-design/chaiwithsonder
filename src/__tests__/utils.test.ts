import { truncate, getAvatarUrl, formatDate } from '@/lib/utils';

describe('Utils', () => {
    describe('truncate', () => {
        it('returns the string unchanged if within maxLength', () => {
            expect(truncate('hello', 10)).toBe('hello');
        });

        it('truncates with ellipsis when over maxLength', () => {
            expect(truncate('hello world', 5)).toBe('hello…');
        });

        it('handles empty string', () => {
            expect(truncate('', 5)).toBe('');
        });
    });

    describe('getAvatarUrl', () => {
        it('returns photo when provided', () => {
            expect(getAvatarUrl('Jane', '/photos/jane.jpg')).toBe('/photos/jane.jpg');
        });

        it('returns DiceBear URL when no photo', () => {
            const url = getAvatarUrl('Jane Doe');
            expect(url).toContain('dicebear.com');
            expect(url).toContain('Jane%20Doe');
        });

        it('returns DiceBear URL when photo is empty string', () => {
            const url = getAvatarUrl('Test User', '');
            expect(url).toContain('dicebear.com');
        });
    });

    describe('formatDate', () => {
        it('formats a date correctly', () => {
            const date = new Date('2026-02-11');
            const formatted = formatDate(date);
            expect(formatted).toContain('2026');
            expect(formatted).toContain('February');
        });
    });
});
