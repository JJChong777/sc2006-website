import "./globals.css";
import { AuthProvider } from "../app/auth/authentication_functions/AuthContext";
import "dotenv/config";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar></Navbar>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
