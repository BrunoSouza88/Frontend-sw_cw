import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Star Wars Characters",
  description: "Explore the characters from the Star Wars universe.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
