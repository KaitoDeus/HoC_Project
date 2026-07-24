"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import Tracking from "@/components/common/Tracking";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceSection {
  id: string;
  title: string;
  titleVi: string;
  content: React.ReactNode;
  contentVi: React.ReactNode;
}

const sections: ServiceSection[] = [
  {
    id: "care",
    title: "Care Guide",
    titleVi: "Hướng dẫn bảo quản",
    content: (
      <div className="space-y-3 pt-1">
        <p>
          Heart of Classy bags are crafted from premium microfiber leather,
          selected for its durability, refined texture, and ability to maintain
          its shape over time.
        </p>
        <p>To preserve the appearance of your bag:</p>
        <div className="space-y-1 pl-1">
          <p>• Store it in its dust bag when not in use.</p>
          <p>
            • Avoid prolonged exposure to moisture, heat, and direct sunlight.
          </p>
          <p>
            • If the bag becomes wet, gently wipe it with a soft, dry cloth and
            allow it to air dry naturally.
          </p>
          <p>
            • Avoid contact with sharp objects that may scratch the surface.
          </p>
          <p>
            • Do not overfill the bag, as this may affect its shape over time.
          </p>
        </div>
      </div>
    ),
    contentVi: (
      <div className="space-y-3 pt-1">
        <p>
          Túi xách Heart of Classy được chế tác từ da microfiber cao cấp, được
          lựa chọn kỹ lưỡng vì độ bền, bề mặt tinh tế và khả năng giữ phom dáng
          theo thời gian.
        </p>
        <p>Để bảo quản vẻ ngoài của túi:</p>
        <div className="space-y-1 pl-1">
          <p>• Cất túi trong túi vải bảo vệ (dust bag) khi không sử dụng.</p>
          <p>
            • Tránh tiếp xúc lâu với hơi ẩm, nhiệt độ cao và ánh nắng trực tiếp.
          </p>
          <p>
            • Nếu túi bị ướt, hãy lau nhẹ nhàng bằng khăn khô mềm và để khô tự
            nhiên.
          </p>
          <p>• Tránh tiếp xúc với các vật sắc nhọn có thể làm xước bề mặt.</p>
          <p>
            • Không đựng quá đầy để tránh làm ảnh hưởng đến phom dáng của túi.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "shipping",
    title: "Shipping",
    titleVi: "Vận chuyển",
    content: (
      <div className="space-y-3 pt-1">
        <p>
          Orders are typically prepared and dispatched within 1 – 5 business
          days. Delivery times may vary depending on your location and shipping
          carrier.
        </p>
        <p>
          For international orders, delivery times and shipping fees may vary by
          destination.
        </p>
      </div>
    ),
    contentVi: (
      <div className="space-y-3 pt-1">
        <p>
          Đơn hàng thường được chuẩn bị và gửi đi trong vòng 1 – 5 ngày làm
          việc. Thời gian giao hàng có thể thay đổi tùy thuộc vào vị trí của bạn
          và đơn vị vận chuyển.
        </p>
        <p>
          Đối với đơn hàng quốc tế, thời gian giao hàng và phí vận chuyển có thể
          thay đổi tùy theo điểm đến.
        </p>
      </div>
    ),
  },
  {
    id: "returns",
    title: "Returns & Exchanges",
    titleVi: "Đổi trả & bảo hành",
    content: (
      <div className="space-y-3 pt-1">
        <p>
          If you receive an item with a manufacturing defect or an incorrect
          item, please contact us within 48 hours of delivery and provide clear
          photos of the issue.
        </p>
        <p>
          Items must remain unused and be returned in their original condition,
          including all accompanying packaging.
        </p>
      </div>
    ),
    contentVi: (
      <div className="space-y-3 pt-1">
        <p>
          Nếu bạn nhận được sản phẩm có lỗi sản xuất hoặc không đúng sản phẩm đã
          đặt, vui lòng liên hệ với chúng tôi trong vòng 48 giờ kể từ khi nhận
          hàng và cung cấp hình ảnh rõ nét về tình trạng lỗi.
        </p>
        <p>
          Sản phẩm đổi trả phải chưa qua sử dụng và được gửi lại nguyên vẹn
          trạng thái ban đầu, bao gồm toàn bộ bao bì đi kèm.
        </p>
      </div>
    ),
  },
  {
    id: "packaging",
    title: "Packaging",
    titleVi: "Đóng gói",
    content: (
      <div className="space-y-3 pt-1">
        <p>
          Each Heart of Classy bag is carefully prepared and packaged before it
          reaches you. Designed to protect the product while creating a
          thoughtful unboxing experience, every order reflects the same
          attention to detail found in our designs.
        </p>
      </div>
    ),
    contentVi: (
      <div className="space-y-3 pt-1">
        <p>
          Mỗi chiếc túi Heart of Classy đều được chuẩn bị và đóng gói cẩn thận
          trước khi gửi đến bạn. Được thiết kế để bảo vệ sản phẩm đồng thời mang
          lại trải nghiệm mở hộp trọn vẹn, mỗi đơn hàng đều phản chiếu sự tỉ mỉ
          chi tiết tương tự như trên các thiết kế của chúng tôi.
        </p>
      </div>
    ),
  },
];

export default function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = React.use(params);
  const isVi = locale === "vi";

  const [openId, setOpenId] = useState<string>("care");

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? "" : id);
  };

  return (
    <>
      <Tracking />
      <Header />

      <main className="w-full min-h-screen bg-neutral-950 text-white select-none flex flex-col justify-center items-center px-6 md:px-12 pt-28 pb-16">
        <div className="w-full max-w-[1000px] mx-auto my-auto flex flex-col justify-center">
          <div className="w-full flex flex-col space-y-6">
            {sections.map((section) => {
              const isOpen = openId === section.id;

              return (
                <div key={section.id} className="w-full">
                  <button
                    onClick={() => toggleItem(section.id)}
                    className="flex items-center gap-3 py-1 text-left uppercase font-sans text-[28px] leading-[34px] tracking-[0.05em] text-white outline-none font-normal"
                    aria-expanded={isOpen}
                  >
                    <span>{isVi ? section.titleVi : section.title}</span>
                    <span className="font-normal text-[28px] leading-[34px]">
                      {isOpen ? "–" : "+"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: {
                            duration: 0.4,
                            ease: [0.25, 1, 0.5, 1],
                          },
                          opacity: { duration: 0.3, delay: 0.05 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-4 md:pb-6 pr-4 font-sans text-[22px] leading-[30px] text-white font-normal">
                          {isVi ? section.contentVi : section.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
