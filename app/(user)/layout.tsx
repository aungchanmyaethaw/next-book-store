import Navbar from "@/components/user/Navbar";
import "../globals.css";
import Footer from "@/components/user/Footer";

import { Session, User } from "next-auth";

import Provider from "@/lib/Provider";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Book Store",
  description: "This is book store.",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <>
            <Navbar />
            {children}
            <Footer />
          </>
        </Provider>
      </body>
    </html>
  );
}
