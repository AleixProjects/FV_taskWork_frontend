import {
  useNavigation,
  useSearchParams,
  useActionData,
} from "@remix-run/react";
import { Link } from "lucide-react";
import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";
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
      <h2 className="text-2xl font-bold mb-5">
        {authMode ? "Login" : "Register"}
      </h2>
      <Form method="post" id="auth-form" className="space-y-4">
        {!authMode && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            
          </div>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitting ? "Authenticating..." : submitBtnCaption}
          </button>
        </div>
        <Link
          // També hem hagut de fer ús del ternari per canviar el link com a tal!
          to={authMode === "login" ? "?mode=signup" : "?mode=login"}
          className="mt-3 block text-indigo-600"
        >
          {toggleBtnCaption}
        </Link>
      </Form>
      
    </div>
  );
}

export default AuthForm;
