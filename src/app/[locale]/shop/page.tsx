import Header from "@/components/common/Header";
import Gallery from "@/components/features/home/Gallery";
import Tracking from "@/components/common/Tracking";

export default function ShopPage() {
  return (
    <>
      {/* Script Theo dõi GA4 và Meta Pixel */}
      <Tracking />

      {/* Thanh điều hướng */}
      <Header />

      {/* Nội dung chính của trang Cửa Hàng */}
      <main className="flex-grow">
        <Gallery />
      </main>
    </>
  );
}
