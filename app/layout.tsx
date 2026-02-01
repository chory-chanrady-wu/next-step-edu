import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "NextStepEdu",
  description: "Your guide to universities and scholarships",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
