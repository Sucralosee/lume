import "./globals.css";

export const metadata = {
  title: "Lume",
  description: "Discover the power of Lume",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
