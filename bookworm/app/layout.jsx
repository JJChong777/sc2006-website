import "./globals.css";
import { AuthProvider } from "../app/auth/authentication_functions/AuthContext";
import "dotenv/config";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
