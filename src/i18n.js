import i18n from 'i18next';
import { initReactI18next, } from 'react-i18next';
import Backend from 'i18next-http-backend';

const userLanguage = window.navigator.language;


i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: localStorage.getItem('language') || userLanguage || 'en',
    backend: {
      loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/translation.json`
    },    
    react: {
      wait: true,
      useSuspense: false,
    },    
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false,
    }
  });


export default i18n;