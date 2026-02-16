"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { queryClient } from "../lib/query-client";

type Props = {
  children: ReactNode;
};

import { Toaster } from "@/components/ui/sonner";

export default function ReactQueryProvider({ children }: Props) {
  //   const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
