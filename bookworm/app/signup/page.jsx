"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { handleSignUp } from "../auth/authentication_functions/signup";
import { supabase } from "../auth/db";

export default function SignUp() {
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  // const router = useRouter();

  const onSignUp = async () => {
    console.log("signing user up");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      alert("Please enter a valid email address.");
      return;
    }

    // uncomment during live code demonstartion for password validation

    // const errors = [];
    // if (!/(?=.*[a-z])/.test(password)) {
    //   errors.push("Password must contain at least one lowercase letter (a-z).");
    // }
    // if (!/(?=.*[A-Z])/.test(password)) {
    //   errors.push("Password must contain at least one uppercase letter (A-Z).");
    // }
    // if (!/(?=.*\d)/.test(password)) {
    //   errors.push("Password must contain at least one digit (0-9).");
    // }
    // if (!/(?=.*[@$!%*?&])/.test(password)) {
    //   errors.push(
    //     "Password must contain at least one special character among @$!%*?&."
    //   );
    // }
    // if (!/[A-Za-z\d@$!%*?&]{8,32}/.test(password)) {
    //   errors.push("Password must be between 8 and 32 characters in length.");
    // }

    // if (errors.length > 0) {
    //   setPassword("");
    //   setConfirmPassword("");
    //   alert(errors.join("\n"));
    //   return;
    // }

    // Check if the passwords match
    if (password !== confirmPassword) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      alert("Passwords do not match.");
      return;
    }

    try {
      const { user, error } = await handleSignUp(email, password, supabase);
      if (error) throw error;

      // setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      alert("Sign up successful! Please log in");
      router.push("/login");
      // router.replace("/");
    } catch (err) {
      alert("ERROR at signup: " + err.message);
      console.error("ERROR at signup", err.message);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto w-auto" src="logo.png" alt="Bookworm Logo" />
          <h2 className="mt-10 text-center text-2xl font-serif leading-9 tracking-tight text-gray-900">
            Sign up for your account today!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            {/* <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder=" your username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div> */}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder=" your email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Create Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder=" your password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="confirm your password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={onSignUp}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500"></p>
        </div>
      </div>
    </>
  );
}
