"use client";
import { useGlobalState } from "@/hooks/useGlobalState";
import { ReactNode } from "react";

export default function AppWrapper({ children }: { children: ReactNode }) {
  const [count] = useGlobalState("count");

  return <>{children}</>;
}
