import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

// Mock next/link to render a plain <a> tag
jest.mock('next/link', () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: any }) => (
    <a href={href} {...props}>{children}</a>
  );
});

// Mock lucide-react Heart icon
jest.mock('lucide-react', () => ({
  Heart: (props: any) => <svg data-testid="heart-icon" {...props} />,
}));

describe('Footer', () => {
  it('renders VoteSphere AI branding', () => {
    render(<Footer />);
    expect(screen.getByText('VoteSphere AI')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Footer />);
    const expectedLinks = ['Journey', 'AI Chat', 'Quiz', 'Glossary', 'Dashboard'];
    expectedLinks.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('renders the footer description', () => {
    render(<Footer />);
    expect(
      screen.getByText(/AI-powered interactive election education platform/i)
    ).toBeInTheDocument();
  });

  it('renders "Made with" and heart icon', () => {
    render(<Footer />);
    expect(screen.getByText('Made with')).toBeInTheDocument();
    expect(screen.getByText('for democracy')).toBeInTheDocument();
    expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
  });

  it('renders technology badges', () => {
    render(<Footer />);
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Gemini AI')).toBeInTheDocument();
    expect(screen.getByText('Framer Motion')).toBeInTheDocument();
  });

  it('has correct navigation link hrefs', () => {
    render(<Footer />);
    const journeyLink = screen.getByText('Journey').closest('a');
    expect(journeyLink).toHaveAttribute('href', '/journey');
    const quizLink = screen.getByText('Quiz').closest('a');
    expect(quizLink).toHaveAttribute('href', '/quiz');
  });

  it('has contentinfo role for accessibility', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
