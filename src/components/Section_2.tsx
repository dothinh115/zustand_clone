"use client";
import { useGlobalState } from "@/hooks/useGlobalState";
import { useEffect } from "react";

export default function Section_2() {
  const [count, setCount] = useGlobalState("count");
  useEffect(() => {
    console.log("section 2 rerendered");
  });
  const click = () => {
    setCount(count + 1);
  };
  return (
    <>
      <div className="space-x-2">
        Section 2 : <button onClick={click}>click</button>
      </div>
    </>
  );
}
