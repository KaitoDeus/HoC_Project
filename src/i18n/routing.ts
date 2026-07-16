import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // Danh sách các ngôn ngữ hỗ trợ
  locales: ['en', 'vi'],

  // Ngôn ngữ mặc định khi không khớp locale nào
  defaultLocale: 'en',

  // Ẩn tiền tố ngôn ngữ mặc định trong URL (nếu muốn / thay vì /en)
  localePrefix: 'as-needed',

  // Tắt tự động phát hiện ngôn ngữ trình duyệt để luôn mặc định tiếng Anh khi vào lần đầu
  localeDetection: false
});

// Các helper thay thế cho Link, redirect, useRouter của Next.js
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
