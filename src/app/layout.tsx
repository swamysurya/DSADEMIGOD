import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DSA Roadmap | Learn Data Structures & Algorithms",
  description: "Embark on the journey of mastering Data Structures and Algorithms with our premium, interactive roadmap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
