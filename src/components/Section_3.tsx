"use client";
import { useGlobalState } from "@/hooks/useGlobalState";
import { useEffect } from "react";

export default function Section_3() {
  const [count] = useGlobalState("count");

  useEffect(() => {
    console.log("section 3 rerendered");
  });
  return <>Section 3: {count}</>;
}
