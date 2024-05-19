import i18n from "./i18n";

export default function getTranslatedValue(arValue:string, frValue:string, enValue:string) {
    const currentLang = i18n.language.toLowerCase();
    switch (currentLang) {
      case 'ar':
        return arValue;
      case 'fr':
        return frValue;
      case 'en':
      default:
        return enValue;
    }
  }