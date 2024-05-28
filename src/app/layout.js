import NavBar from "@/components/Navbar/Navbar";
import "./globals.scss";
import { Oswald } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeContext/ThemeContext";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Footer from "@/components/Footer/Footer";

const oswald = Oswald({ subsets: ["latin"] });

export const metadata = {
  title: "OtakuVerse",
  description:
    "Share your thoughts on your favorite anime and post it to the world!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={oswald.className}>
        <ThemeProvider>
          <AuthProvider>
            <NavBar />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
