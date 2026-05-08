import DevList from "@/components/DevList";
import DevSearch from "@/components/DevSearch";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
     
      <main className="pt-14 bg-[#0f1117] min-h-screen px-4 py-10 md:px-8 lg:px-16"> 
        <Hero />
        <div className="mx-auto max-w-6xl space-y-8">
          <DevSearch />
          <DevList />
        </div>
      </main>
    </>
  );
}
