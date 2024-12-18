import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { appConfig } from "./lib/appConfig";
 
// Can be imported from a shared config
const locales = appConfig.i18n.locales;
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as typeof appConfig.i18n.locales[number])) notFound();
 
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});