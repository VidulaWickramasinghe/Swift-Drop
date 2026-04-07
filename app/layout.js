import "./globals.css";

export const metadata = {
  title: "SwiftDrop",
  description: "Mobile-inspired food delivery UI built with Next.js"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}