"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
const supabase = createClientComponentClient();

const AuthContext = createContext({
  isAuthenticated: false,
  userData: {},
  signIn: async (email, password) => {},
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userDataString = window.localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setIsAuthenticated(true);
      setUserData(userData);
    }
  }, [router]);

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data && data.user) {
        setUserData(data.user);
        console.log(data.user);
        setIsAuthenticated(true);
        window.localStorage.setItem("user", JSON.stringify(data.user));
        router.replace("/");
      } else {
        setIsAuthenticated(false);
        console.error("Sign in successful, but no user data found.");
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      alert("Sign in error: " + error.message);
      setIsAuthenticated(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      window.localStorage.removeItem("user");
    } catch (error) {
      console.error("Error Signing Out:", error.message);
      alert("Sign out error: " + error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
