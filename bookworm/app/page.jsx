"use client";

import { useAuth } from "../app/auth/authentication_functions/AuthContext";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function main() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8 flex flex-col items-center">
      <img src="logo.png" alt="Logo" className="h-40 w-25" />
      {/* if not authenticated, display the text to get user to sign up */}
      {!isAuthenticated && (
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Elevate your
          </h2>
          <h2 className="text-4xl font-bold tracking-tight text-blue-400 sm:text-6xl">
            Reading Experience
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Effortlessly search for books, get recommendations, and more!
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign up now!
          </Link>
        </div>
      )}
      {/* otherwise, display this instead */}
      {isAuthenticated && (
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome,{" "}
            <span className="text-blue-400">
              {
                JSON.parse(window.localStorage.getItem("user"))["user"][
                  "email"
                ].split("@")[0]
              }
            </span>
          </h2>

          <Link
            href="/search"
            className="mt-8 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Search for a book now!
          </Link>
        </div>
      )}
    </div>
  );
}
