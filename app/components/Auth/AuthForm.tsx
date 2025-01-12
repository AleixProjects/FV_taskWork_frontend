import {
  useNavigation,
  useSearchParams,
  useActionData,
  Form,
} from "@remix-run/react";
import { Link } from "react-router-dom";
import React from "react";
import { ValidationErrors } from "~/types/interfaces";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const validationErrors = useActionData<ValidationErrors>();

  const authMode = searchParams.get("mode") || "login";
  const submitBtnCaption = authMode === "login" ? "Login" : "Create User";

  const toggleBtnCaption =
    authMode === "login" ? "Create a New User" : "Log in with existing user";

  const isSubmitting = navigation.state !== "idle";

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">
        {authMode === "login" ? "Login" : "Register"}
      </h2>
      <Form method="post" id="auth-form" className="space-y-4">
        {authMode === "signup" && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        {validationErrors && (
          <div className="text-red-500 text-sm mt-2">
            {Object.values(validationErrors).map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            {isSubmitting ? "Authenticating..." : submitBtnCaption}
          </button>
        </div>
        <Link
          to={authMode === "login" ? "?mode=signup" : "?mode=login"}
          className="mt-3 block text-indigo-600 dark:text-indigo-400"
        >
          {toggleBtnCaption}
        </Link>
      </Form>
    </div>
  );
}

export default AuthForm;
