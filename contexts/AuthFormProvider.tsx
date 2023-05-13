"use client";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { ReactNode, useContext, useState } from "react";
import { createContext } from "react";

interface AuthFormContextprops {
  authFormStatus: boolean;
  handleAuthFormOpen: () => void;
  handleAuthFormClose: () => void;
}

const AuthFormContext = createContext({
  authFormStatus: false,
  handleAuthFormOpen: () => {},
  handleAuthFormClose: () => {},
});

export const useAuthFormContext = () => {
  return useContext(AuthFormContext);
};

export default function AuthFormProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [authFormStatus, setAuthFormStatus] = useState<boolean>(false);

  const handleAuthFormOpen = () => {
    setAuthFormStatus(true);
  };

  const handleAuthFormClose = () => {
    setAuthFormStatus(false);
  };

  const contextValue: AuthFormContextprops = {
    authFormStatus,
    handleAuthFormOpen,
    handleAuthFormClose,
  };

  return (
    <AuthFormContext.Provider value={contextValue}>
      {children}
    </AuthFormContext.Provider>
  );
}
