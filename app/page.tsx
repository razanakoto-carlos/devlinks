import DevSection from "@/components/DevSection";
import Hero from "@/components/Hero";
import { getDevs } from "@/lib/actions/dev-actions";

export default async function Home() {
  const devs = await getDevs();
  return (
    <>
      <main className="pt-14 bg-[#0f1117] min-h-screen px-4 py-10 md:px-8 lg:px-16"> 
        <Hero />
        <div className="mx-auto max-w-6xl space-y-8">
          <DevSection devs={devs} />
        </div>
      </main>
    </>
  );
}
