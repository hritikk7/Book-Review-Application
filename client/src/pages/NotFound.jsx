import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 text-center dark:bg-gray-900">
      <div className="max-w-md space-y-6">
        <h1 className="text-8xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          404
        </h1>
        <p className="text-2xl font-medium text-gray-700 dark:text-gray-400">
          Oops, the page you're looking for doesn't exist.
        </p>
        <Link
         to={"/login"}
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-50 dark:focus:ring-offset-gray-900"
         
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
