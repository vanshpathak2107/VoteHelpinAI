import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-4">🗳️</div>
        <h1 className="text-4xl font-bold gradient-text mb-3">Page Not Found</h1>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          This ballot box is empty! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/" className="gradient-button inline-flex items-center gap-2">
          Return Home
        </Link>
      </div>
    </div>
  );
}
