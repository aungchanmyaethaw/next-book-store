"use client";
import { useAuthFormContext } from "@/contexts/AuthFormProvider";
import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AuthFormModal() {
  const { handleAuthFormClose } = useAuthFormContext();
  const [currentLogin, setCurrentLogin] = useState<boolean>(true);

  const handleChangeCurrentRegister = () => {
    setCurrentLogin(false);
  };

  const handleChangeCurrentLogin = () => {
    setCurrentLogin(true);
  };

  return (
    <section
      className="fixed inset-0 flex items-center justify-center w-full h-screen px-2 bg-black bg-opacity-25 "
      onClick={handleAuthFormClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg px-4 py-6 bg-white rounded-lg"
      >
        {currentLogin ? (
          <LoginForm handleGotoRegister={handleChangeCurrentRegister} />
        ) : (
          <RegisterForm handleGogoLogin={handleChangeCurrentLogin} />
        )}
      </div>
    </section>
  );
}
