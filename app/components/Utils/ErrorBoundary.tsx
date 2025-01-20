import { Link } from "@remix-run/react";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Something went wrong</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{error.message}</p>
      <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
        Go back to the main page
      </Link>
    </div>
  );
}

export function CatchBoundary() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
        Go back to the main page
      </Link>
    </div>
  );
}