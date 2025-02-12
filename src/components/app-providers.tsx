"use client";

import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

import { getQueryClient } from "~/lib/query-client";
import { Session } from "next-auth";

export default function AppProviders({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session?: Session | null;
}>) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
