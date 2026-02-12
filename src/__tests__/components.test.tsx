import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MentorCard from '@/components/mentor/MentorCard';
import MentorSearchBar from '@/components/mentor/MentorSearchBar';
import Footer from '@/components/Footer';

// ─── MentorCard ──────────────────────────────────────────────

describe('MentorCard', () => {
    const mentor = {
        name: 'Jane Doe',
        title: 'Software Engineer',
        photo: '/photos/jane.jpg',
        calendly: 'https://calendly.com/jane',
        linkedin: 'https://linkedin.com/in/jane',
    };

    it('renders mentor name and title', () => {
        render(<MentorCard mentor={mentor} />);
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });

    it('renders avatar with correct alt text', () => {
        render(<MentorCard mentor={mentor} />);
        const img = screen.getByAlt('Photo of Jane Doe');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/photos/jane.jpg');
    });

    it('renders booking and LinkedIn links', () => {
        render(<MentorCard mentor={mentor} />);
        const links = screen.getAllByRole('link');
        const calendlyLink = links.find((l: HTMLElement) => l.getAttribute('href') === 'https://calendly.com/jane');
        const linkedinLink = links.find((l: HTMLElement) => l.getAttribute('href') === 'https://linkedin.com/in/jane');
        expect(calendlyLink).toBeDefined();
        expect(linkedinLink).toBeDefined();
    });

    it('falls back to DiceBear avatar when no photo', () => {
        const noPhotoMentor = { ...mentor, photo: '' };
        render(<MentorCard mentor={noPhotoMentor} />);
        const img = screen.getByAlt('Photo of Jane Doe');
        expect(img.getAttribute('src')).toContain('dicebear.com');
    });
});

// ─── MentorSearchBar ────────────────────────────────────────

describe('MentorSearchBar', () => {
    it('renders search input with correct placeholder', () => {
        const mockChange = jest.fn();
        render(<MentorSearchBar search="" onSearchChange={mockChange} />);
        const input = screen.getByPlaceholderText(/Search by name/i);
        expect(input).toBeInTheDocument();
    });

    it('displays the current search value', () => {
        const mockChange = jest.fn();
        render(<MentorSearchBar search="AI mentor" onSearchChange={mockChange} />);
        const input = screen.getByDisplayValue('AI mentor');
        expect(input).toBeInTheDocument();
    });

    it('calls onSearchChange when typing', () => {
        const mockChange = jest.fn();
        render(<MentorSearchBar search="" onSearchChange={mockChange} />);
        const input = screen.getByPlaceholderText(/Search by name/i);
        fireEvent.change(input, { target: { value: 'test' } });
        expect(mockChange).toHaveBeenCalledWith('test');
    });
});

// ─── Footer ─────────────────────────────────────────────────

describe('Footer', () => {
    it('renders brand name', () => {
        render(<Footer />);
        expect(screen.getByText('ChaiChat Hub')).toBeInTheDocument();
    });

    it('renders LinkedIn link with correct URL', () => {
        render(<Footer />);
        const linkedinLink = screen.getByLabelText('Follow Chai Chat on LinkedIn');
        expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/company/chaichathub');
        expect(linkedinLink).toHaveAttribute('target', '_blank');
    });

    it('renders email contact link', () => {
        render(<Footer />);
        const emailLink = screen.getByLabelText('Email Chai Chat');
        expect(emailLink).toHaveAttribute('href', 'mailto:hello@chaichathub.com');
    });

    it('renders Quick Links section with navigation', () => {
        render(<Footer />);
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Meet the Mentors')).toBeInTheDocument();
        expect(screen.getByText('Share a Chat')).toBeInTheDocument();
    });

    it('renders copyright with current year', () => {
        render(<Footer />);
        const year = new Date().getFullYear().toString();
        expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
    });
});
