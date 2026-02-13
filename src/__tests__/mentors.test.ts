import { mentors } from '@/data/mentors';

describe('Mentor Data', () => {
    it('has at least one mentor', () => {
        expect(mentors.length).toBeGreaterThan(0);
    });

    it('every mentor has a name and title', () => {
        mentors.forEach((mentor) => {
            expect(mentor.name).toBeTruthy();
            expect(mentor.title).toBeTruthy();
        });
    });

    it('every mentor has a photo path or empty string', () => {
        mentors.forEach((mentor) => {
            expect(typeof mentor.photo).toBe('string');
        });
    });

    it('mentors with calendly links have valid URLs', () => {
        mentors
            .filter((m) => m.calendly)
            .forEach((mentor) => {
                expect(mentor.calendly).toMatch(/^https?:\/\//);
            });
    });

    it('mentors with linkedin links have valid URLs', () => {
        mentors
            .filter((m) => m.linkedin)
            .forEach((mentor) => {
                expect(mentor.linkedin).toMatch(/^https?:\/\//);
            });
    });
});
