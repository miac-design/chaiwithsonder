# ChaiWithSonder

A community-driven mentoring platform that connects mentors and mentees, and helps people find accountability partners.

## Features

- **Mentorship Matching**: Connect with mentors who share your interests and goals
- **Accountability Partners**: Find partners to help you stay on track with your goals
- **Donation System**: Support the platform's mission to make mentorship accessible
- **Modern UI**: Clean and professional design built with Next.js and Tailwind CSS

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React Hooks for state management

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chaiwithsonder.git
cd chaiwithsonder
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # App router pages
│   ├── (routes)/          # Route groups
│   │   ├── about/        # About page
│   │   ├── mentor/       # Mentor signup page
│   │   ├── partner/      # Partner finder page
│   │   ├── donate/       # Donation page
│   │   └── contact/      # Contact page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/            # Reusable components
│   ├── Navbar.tsx        # Navigation component
│   └── Footer.tsx        # Footer component
└── styles/               # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Hero image from [Unsplash](https://unsplash.com)
- Icons from [Heroicons](https://heroicons.com)
