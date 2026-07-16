import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // Nhận locale hiện tại từ URL segment
  let locale = await requestLocale;

  // Nếu không có hoặc không hợp lệ, dùng defaultLocale
  if (!locale || !routing.locales.includes(locale as 'vi' | 'en')) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
