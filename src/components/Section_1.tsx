"use client";
import { useGlobalState } from "@/hooks/useGlobalState";
import { useEffect } from "react";
export default function Section_1() {
  const [count] = useGlobalState("count", 1);
  useEffect(() => {
    console.log("section 1 rerendered");
  });
  return <div>Section 1: {count}</div>;
}
