import AppWrapper from "@/components/AppWrapper";
import Section_1 from "@/components/Section_1";
import Section_2 from "@/components/Section_2";
import Section_3 from "@/components/Section_3";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-5">
      <AppWrapper>
        <Section_1 />
        <Section_2 />
        <Section_3 />
      </AppWrapper>
      <br />
      <Link href="/protected">protected</Link>
    </div>
  );
}
