"use client";
import { useAuthFormContext } from "@/contexts/AuthFormProvider";
import AuthFormModal from "@/components/auth/AuthFormModal";
import Link from "next/link";
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function Navbar() {
  const { handleAuthFormOpen, authFormStatus } = useAuthFormContext();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user.role === "admin") {
      redirect("/admin");
    }
  }, [session?.user.role]);

  const handleLogout = () => {
    signOut({ callbackUrl: `${window.location.origin}` });
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 py-6 mx-auto bg-accent md:px-12">
        <Link href="/" className="text-2xl text-white text-semibold">
          Book Store
        </Link>
        <div className="flex items-center gap-4">
          {status === "authenticated" ? (
            <div className="flex items-center gap-4 text-white">
              <h2 className="text-white">{session?.user?.username}</h2>
              <button
                className="px-4 py-1 text-sm font-semibold text-white rounded-lg btn btn-sm btn-outline"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              className="px-4 py-1 font-semibold text-white rounded-lg btn btn-sm btn-outline"
              onClick={handleAuthFormOpen}
            >
              Log in
            </button>
          )}
        </div>
      </header>
      {authFormStatus ? <AuthFormModal /> : null}
    </>
  );
}
