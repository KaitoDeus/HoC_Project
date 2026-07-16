import Header from "@/components/common/Header";
import Tracking from "@/components/common/Tracking";
import Accordion from "@/components/ui/Accordion";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isVi = locale === "vi";

  // localized content for the Care & Services page
  const pageTitle = isVi ? "Bảo Quản & Dịch Vụ" : "Care & Services";
  const pageSubtitle = isVi
    ? "Chúng tôi cam kết mang lại trải nghiệm dịch vụ chăm sóc sản phẩm cao cấp, xứng tầm chất lượng tác phẩm nghệ thuật."
    : "We are committed to providing premium product care and services worthy of our handcrafted artwork.";

  const careGuideContent = isVi ? (
    <div className="space-y-3 font-sans font-light">
      <p>
        Các sản phẩm của <strong>HEART of CLASSY</strong> được chế tác bằng tay tỉ mỉ từ những chất liệu da cao cấp và phụ kiện kim loại chọn lọc. Để giữ cho sản phẩm luôn bền đẹp theo thời gian, vui lòng lưu ý:
      </p>
      <ul className="list-disc pl-4 space-y-1.5">
        <li>Lau nhẹ nhàng bề mặt da bằng khăn ẩm mềm khi vệ sinh.</li>
        <li>Tránh tiếp xúc trực tiếp với các chất chứa dầu mỡ, mỹ phẩm, nước hoa hoặc dung môi hóa học.</li>
        <li>Hạn chế phơi nắng gắt hoặc để ở những nơi có độ ẩm cao trong thời gian dài.</li>
        <li>Bảo quản trong dustbag đi kèm và nhét giấy giữ phom dáng khi không sử dụng.</li>
      </ul>
    </div>
  ) : (
    <div className="space-y-3 font-sans font-light">
      <p>
        Every <strong>HEART of CLASSY</strong> creation is meticulously handcrafted from premium grade leathers and custom metal hardware. To preserve its pristine condition over time, please observe the following care:
      </p>
      <ul className="list-disc pl-4 space-y-1.5">
        <li>Wipe gently with a soft damp cloth.</li>
        <li>Avoid direct contact with oily substances, cosmetics, perfumes, or chemical solvents.</li>
        <li>Limit exposure to strong direct sunlight and high humidity for prolonged periods.</li>
        <li>Always store in its original protective dustbag with soft paper stuffing to maintain shape.</li>
      </ul>
    </div>
  );

  const shippingContent = isVi ? (
    <div className="space-y-2 font-sans font-light">
      <p>Chúng tôi cung cấp dịch vụ giao hàng nhanh cao cấp trên toàn quốc:</p>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Thời gian giao hàng:</strong> 2 - 4 ngày làm việc.</li>
        <li><strong>Theo dõi đơn hàng:</strong> Mỗi đơn hàng đều được cung cấp mã vận đơn chi tiết gửi qua email/tin nhắn.</li>
        <li><strong>Chi phí vận chuyển:</strong> Đồng giá 30.000đ toàn quốc. Miễn phí vận chuyển cho tất cả hóa đơn từ 2.000.000đ trở lên.</li>
      </ul>
    </div>
  ) : (
    <div className="space-y-2 font-sans font-light">
      <p>We provide premium shipping solutions nationwide:</p>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Delivery Timeframe:</strong> 2 - 4 business days.</li>
        <li><strong>Order Tracking:</strong> A unique signature tracking link will be provided upon dispatch.</li>
        <li><strong>Shipping Cost:</strong> Flat rate of 30,000đ nationwide. Complimentary shipping is applicable for all orders above 2,000,000đ.</li>
      </ul>
    </div>
  );

  const returnsContent = isVi ? (
    <div className="space-y-2 font-sans font-light">
      <p>Chính sách đổi hàng linh hoạt để đảm bảo sự hài lòng tối đa:</p>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Thời hạn:</strong> Hỗ trợ đổi sản phẩm trong vòng 3 ngày kể từ ngày nhận hàng thành công.</li>
        <li><strong>Điều kiện:</strong> Sản phẩm đổi trả phải còn nguyên vẹn trạng thái ban đầu, chưa qua sử dụng, đầy đủ tem mác và hộp phụ kiện đi kèm.</li>
        <li><strong>Cách thức:</strong> Nhắn tin trực tiếp cho bộ phận hỗ trợ khách hàng của chúng tôi qua Facebook/Instagram để được xử lý nhanh nhất.</li>
      </ul>
    </div>
  ) : (
    <div className="space-y-2 font-sans font-light">
      <p>Flexible exchange policy to guarantee complete satisfaction:</p>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Window:</strong> Exchanges are accepted within 3 days of successful delivery.</li>
        <li><strong>Condition:</strong> The item must be unused, unaltered, in its original state, with all tags and package contents intact.</li>
        <li><strong>Process:</strong> Connect directly with our customer experience team via Facebook or Instagram to initiate your request.</li>
      </ul>
    </div>
  );

  const packagingContent = isVi ? (
    <div className="space-y-2 font-sans font-light">
      <p>Trải nghiệm bóc hộp cao cấp mang đậm dấu ấn riêng biệt:</p>
      <p>
        Mỗi tác phẩm từ <strong>HEART of CLASSY</strong> đều được bọc giấy chống ẩm kỹ lưỡng, đặt trong hộp quà cứng (rigid box) thắt nơ ruy-băng sang trọng kèm túi vải bảo vệ. Thích hợp để làm quà tặng cho chính bạn hoặc những người thân yêu nhất.
      </p>
    </div>
  ) : (
    <div className="space-y-2 font-sans font-light">
      <p>An exceptional premium unboxing experience:</p>
      <p>
        Each <strong>HEART of CLASSY</strong> creation is carefully wrapped in moisture-resistant tissue, housed in a signature rigid ribbon-tied box, and accompanied by a protective velvet dustbag. It arrives ready to be gifted to yourself or your loved ones.
      </p>
    </div>
  );

  return (
    <>
      <Tracking />
      <Header />

      <main className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row md:h-screen md:overflow-hidden select-none">
        
        {/* LEFT COLUMN: Page Title & Info */}
        <div className="w-full md:w-[35%] lg:w-[30%] bg-neutral-950 flex flex-col justify-between p-8 pt-32 pb-16 md:p-12 md:pt-40 md:pb-24 lg:p-16 lg:pt-48 lg:pb-32 space-y-12 md:space-y-0 h-full border-r border-neutral-900/40 z-10">
          <div className="hidden md:block" />

          <div className="space-y-6">
            <span className="text-[11px] tracking-[0.3em] text-neutral-500 font-medium block">
              HEART of CLASSY
            </span>
            <h1 className="text-3xl lg:text-4xl font-light font-hyogo tracking-wide leading-tight text-white">
              {pageTitle}
            </h1>
            <p className="text-white font-light leading-relaxed text-xs lg:text-sm font-sans max-w-xs">
              {pageSubtitle}
            </p>
          </div>

          {/* Contact note */}
          <div className="text-neutral-500 text-[10px] tracking-widest font-sans">
            {isVi ? "Chế tác tỉ mỉ tại Việt Nam" : "Meticulously crafted in Vietnam"}
          </div>
        </div>

        {/* RIGHT COLUMN: Accordion Sections */}
        <div className="w-full md:w-[65%] lg:w-[70%] h-full overflow-y-auto px-8 py-16 md:px-16 md:py-32 lg:px-24 lg:py-48 flex items-center bg-neutral-950 border-t md:border-t-0 border-neutral-900">
          <div className="w-full max-w-2xl space-y-8">
            <Accordion
              variant="minimal"
              defaultOpenId="care"
              items={[
                {
                  id: "care",
                  title: isVi ? "Hướng Dẫn Bảo Quản" : "Care Guide",
                  content: careGuideContent,
                },
                {
                  id: "shipping",
                  title: isVi ? "Giao Hàng & Vận Chuyển" : "Shipping",
                  content: shippingContent,
                },
                {
                  id: "returns",
                  title: isVi ? "Chính Sách Đổi Trả" : "Returns & Exchanges",
                  content: returnsContent,
                },
                {
                  id: "packaging",
                  title: isVi ? "Đóng Gói Quà Tặng" : "Packaging",
                  content: packagingContent,
                },
              ]}
            />
          </div>
        </div>

      </main>
    </>
  );
}
