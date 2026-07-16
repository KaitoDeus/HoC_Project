import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Chỉ match các đường dẫn cần đa ngôn ngữ
  // Bỏ qua các file tĩnh trong public, file nội bộ _next và api routes
  matcher: [
    // Match tất cả các đường dẫn bắt đầu bằng locale /vi hoặc /en
    '/',
    '/(vi|en)/:path*',
    // Match tất cả các đường dẫn khác ngoại trừ file tĩnh, _next, favicon...
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
