import CanvasLoading from "@/components/features/loading/CanvasLoading";
import Header from "@/components/common/Header";
import Hero from "@/components/features/home/Hero";
import Tracking from "@/components/common/Tracking";

export default async function HomePage() {
  return (
    <>
      <Tracking />
      <CanvasLoading />
      <Header />
      <main className="w-full min-h-screen bg-neutral-950">
        <Hero />
      </main>
    </>
  );
}
