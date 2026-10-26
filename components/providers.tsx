"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } })
  );
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-right"
      ></ReactQueryDevtools>
      {children}
    </QueryClientProvider>
  );
}
