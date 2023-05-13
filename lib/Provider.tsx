"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session, User } from "next-auth";
import AuthFormProvider from "@/contexts/AuthFormProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      username: string;
      role: string;
    };
  }
}

const queryClient = new QueryClient();

export default function Provider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session;
}) {
  return (
    <SessionProvider session={session}>
      <AuthFormProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AuthFormProvider>
    </SessionProvider>
  );
}
