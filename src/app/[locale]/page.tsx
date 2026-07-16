import CanvasLoading from "@/components/features/loading/CanvasLoading";
import Header from "@/components/common/Header";
import Hero from "@/components/features/home/Hero";
import Tracking from "@/components/common/Tracking";

export default async function HomePage() {
  return (
    <>
      {/* Script Theo dõi GA4 và Meta Pixel */}
      <Tracking />

      {/* Màn hình chờ tải trang với Trái tim 3D mạ kim loại */}
      <CanvasLoading />

      {/* Thanh điều hướng */}
      <Header />

      {/* Nội dung chính của trang chủ */}
      <main className="w-full min-h-screen bg-neutral-950">
        {/* Banner Hero */}
        <Hero />
      </main>
    </>
  );
}
