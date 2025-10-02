import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Idea Board",
  description: "Share and upvote ideas anonymously",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}
