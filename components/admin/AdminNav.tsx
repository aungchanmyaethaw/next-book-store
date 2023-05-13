"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function AdminNav() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: `${window.location.origin}` });
  };

  useEffect(() => {
    if (session) {
      if (session?.user?.role !== "admin") {
        router.push("/");
      }
    }
  }, [session]);

  return (
    <header>
      <button onClick={handleLogout}>Log out</button>
    </header>
  );
}
