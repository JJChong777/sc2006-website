import "./globals.css";
import { AuthProvider } from "../app/auth/authentication_functions/AuthContext";
import "dotenv/config";
import Navbar from "./components/Navbar";

export const metadata = {
  icons: {
    icon: "/favicon.ico", // /public path
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
