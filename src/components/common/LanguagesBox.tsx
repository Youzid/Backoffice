import { useEffect, useRef, useState } from "react";
import i18n from "../../utils/i18n";
import { t } from "i18next";

const LanguagesBox = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("french");
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('click', handleClickOutside);

    i18n?.changeLanguage(i18n?.language?.slice(0, 2));
    if (i18n.language.toLowerCase() === "ar") {
      setSelectedLanguage("arabic");
      i18n?.changeLanguage('ar');
    } else if (i18n.language.toLowerCase() === "fr") {
      setSelectedLanguage("french");
      i18n?.changeLanguage('fr');
    } else {
      setSelectedLanguage("english");
      i18n?.changeLanguage('en');
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuRef]);

  const handleLanguageChange = (language: string, symbol: string) => {
    setSelectedLanguage(language);
    i18n?.changeLanguage(symbol);
    window.location.reload();
    setShowMenu(false);
  };

  return (
    <div  ref={menuRef} >
      <div className="relative">
        <button className="z-50 text-gray-700 font-semibold p-3 lg:py-3 lg:px-4 rounded inline-flex items-center" onClick={() => setShowMenu(!showMenu)}>
          <span className="me-1 lg:me-3 flex gap-x-2 lg:gap-x-3 items-center">
            <h3 className="text-xs lg:text-base">{t(selectedLanguage)}</h3>
          </span>
          <svg className="hidden fill-current lg:h-4 lg:w-4 " viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7l-5 5z" /></svg>
        </button>
        <ul className={`bg-white z-50 absolute ${showMenu ? 'block' : 'hidden'}  start-0 bg-lightPrimary rounded-xl overflow-hidden shadow-lg w-fit h-[132]`}>
          <li className="hover:bg-gray-200 py-2 px-4 cursor-pointer w-full" onClick={() => { handleLanguageChange("french", "fr"); }}>
            <span className="flex items-center gap-x-2">
              <p className="text-primaryBlack max-w-xs text-xs lg:text-base">{t('french')}</p>
            </span>
          </li>
          <li className="hover:bg-gray-200 py-2 px-4 cursor-pointer w-full" onClick={() => { handleLanguageChange("arabic", "ar"); }}>
            <span className="flex items-center gap-x-2">
              <p className="text-primaryBlack max-w-xs text-xs lg:text-base">{t('arabic')}</p>
            </span>
          </li>
          <li className="hover:bg-gray-200 py-2 px-4 cursor-pointer w-full" onClick={() => { handleLanguageChange("english", "en"); }}>
            <span className="flex items-center gap-x-2">
              <p className="text-primaryBlack max-w-xs text-xs lg:text-base">{t('english')}</p>
            </span>
          </li>

        </ul>
      </div>

    </div>
  );
};

export default LanguagesBox;