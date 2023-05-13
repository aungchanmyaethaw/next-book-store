import React from "react";
import AdminLeftSidebar from "@/components/admin/AdminLeftSidebar";
import AdminNav from "@/components/admin/AdminNav";
import "../globals.css";
import Provider from "@/lib/Provider";
import { Session } from "next-auth";

export const metadata = {
  title: "Admin",
};

export default function AdminLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <Provider session={session}>
            <AdminNav />
            <AdminLeftSidebar />
            {children}
          </Provider>
        </main>
      </body>
    </html>
  );
}
