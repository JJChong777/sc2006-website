"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/authentication_functions/AuthContext";
import { useEffect } from "react";

export default function SignOut() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Call handleSignOut when the component mounts
  useEffect(() => {
    handleSignOut();
    router.replace("/");
  }, []);

  return null; // This component doesn't render anything
}
