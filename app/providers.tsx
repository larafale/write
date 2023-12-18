"use client";

import { UserProvider } from "@/lib/user";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/modal/provider";

export function Providers({ children, user }: { children: React.ReactNode, user: any }) {
  return (
    <UserProvider user={user}>
      <Toaster className="dark:hidden" />
      <Toaster theme="dark" className="hidden dark:block" />
      <ModalProvider>{children}</ModalProvider>
    </UserProvider>
  );
}
