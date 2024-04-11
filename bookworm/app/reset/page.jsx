"use client";
import { useState } from "react";
import { supabase } from "../auth/db";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const router = useRouter();

  const resetPassword = async () => {
    console.log("resetting password");
    const errors = [];
    if (!/(?=.*[a-z])/.test(newPassword)) {
      errors.push(
        "New password must contain at least one lowercase letter (a-z)."
      );
    }
    if (!/(?=.*[A-Z])/.test(newPassword)) {
      errors.push(
        "New password must contain at least one uppercase letter (A-Z)."
      );
    }
    if (!/(?=.*\d)/.test(newPassword)) {
      errors.push("New password must contain at least one digit (0-9).");
    }
    if (!/(?=.*[@$!%*?&])/.test(newPassword)) {
      errors.push(
        "New password must contain at least one special character among @$!%*?&."
      );
    }
    if (newPassword.length > 32 || newPassword.length < 8) {
      errors.push(
        "New password must be between 8 and 32 characters in length."
      );
    }

    if (errors.length > 0) {
      setNewPassword("");
      setConfirmNewPassword("");
      alert(errors.join("\n"));
      return;
    }

    // Check if the passwords match
    if (newPassword !== confirmNewPassword) {
      setNewPassword("");
      setConfirmNewPassword("");
      alert("New passwords do not match.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      setNewPassword("");
      setConfirmNewPassword("");
      if (error) throw error;
      if (data) {
        // console.log(data);
        alert("Password reset successfully. Please login");
        router.replace("/login");
      }
    } catch (error) {
      console.error(error);
      alert(`Reset password failed! ERROR: ${error.message}`);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto w-auto" src="logo.png" alt="Bookworm Logo" />
          <h2 className="mt-10 text-center text-2xl font-serif leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  placeholder="new password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-new-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm New Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="confirm-new-password"
                  name="confirm-new-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                  }}
                  placeholder="confirm new password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={resetPassword}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500"></p>
        </div>
      </div>
    </>
  );
}
