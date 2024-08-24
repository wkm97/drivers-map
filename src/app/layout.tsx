import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next App Drivers Map",
  description: "Look for nearby driver and estimate pick up time",
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
